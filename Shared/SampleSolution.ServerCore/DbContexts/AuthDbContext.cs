using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.ServerCore.DbContexts
{
    public class AuthUser : IdentityUser, IEntity<string>
    {
        public DateTime CreatedTime { get; set; }
        public DateTime LastUpdateTime { get; set; }
    }

    public class AuthDbContext : IdentityDbContext<AuthUser>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.HasDefaultSchema("sample_solution_auth");

            Entity<long> tEntity = new Entity<long>();
            builder.Entity<AuthUser>().Property(nameof(tEntity.Id))
                .ValueGeneratedOnAdd();
            builder.Entity<AuthUser>().Property(nameof(tEntity.CreatedTime))
                .HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAdd();
            builder.Entity<AuthUser>().Property(nameof(tEntity.LastUpdateTime))
                .HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAddOrUpdate();

            foreach (IMutableEntityType entity in builder.Model.GetEntityTypes())
            {
                // Replace table names
                entity.SetTableName(entity.GetTableName().ToSnakeCase());

                // Replace column names
                foreach (IMutableProperty property in entity.GetProperties())
                {
                    property.SetColumnName(property.GetColumnName().ToSnakeCase());
                }

                foreach (IMutableKey key in entity.GetKeys())
                {
                    key.SetName(key.GetName().ToSnakeCase());
                }

                foreach (IMutableForeignKey key in entity.GetForeignKeys())
                {
                    key.SetConstraintName(key.GetConstraintName().ToSnakeCase());
                }

                foreach (IMutableIndex index in entity.GetIndexes())
                {
                    index.SetName(index.GetName().ToSnakeCase());
                }
            }
        }

        public void Initialize(UserManager<AuthUser> userManager)
        {
            if (this.Database.ProviderName != "Microsoft.EntityFrameworkCore.InMemory")
            {
                this.Database.MigrateAsync().Wait();
            }

            AuthUser user = this.Users.FirstOrDefaultAsync(x => x.Email == "demo@example.com").Result;
            if (user == null)
            {
                AuthUser admin = new AuthUser { UserName = "demo", Email = "demo@example.com" };

                /**
                 * W^2t7rk(bWn^<}KM - demo password for showcase.
                 * Later need move it to environment variables
                 */
                userManager.CreateAsync(admin, "W^2t7rk(bWn^<}KM").Wait();
            }
        }
    }
}