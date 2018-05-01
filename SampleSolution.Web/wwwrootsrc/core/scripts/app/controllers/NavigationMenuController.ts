import {BaseController} from './_base/BaseController';
import {navigationMenuView} from '../views/NavigationMenuView';
// import * as alertify from 'alertify.js';
import {PageController} from './_base/PageController';

export class MenuElement {
    public title: string;
    public href: string;
    public isActive: boolean = false;

    constructor(title: string, href: string) {
        this.title = title;
        this.href = href;
    }
}

export class NavigationMenuOptions {
    public pages: PageController<object>[] = [];
    public elements?: MenuElement[];
}

export class NavigationMenuController<T extends NavigationMenuOptions, S> extends BaseController<NavigationMenuOptions, S> {

    public menuElements: MenuElement[] = [];
    public pages: PageController<object>[] = [];

    constructor(props: T, context?: object) {
        super(
            props,
            context,
            require('./../../../content/less/navigation_menu.less'),
            navigationMenuView
        );
        this.activate();
        this.update();
    }

    public activate(): void {
        this.pages = this.props.pages.filter((page: PageController<object>) => page.isShowInNavigation) || [];
        this.createMenuElements();
        window.addEventListener(
            'hashchange',
            () => {
                this.redraw();
            }
        );
    }

    public update(): void {
        // code here
    }

    public async createMenuElements(): Promise<void> {

        await this.getCurrentUser();

        if (this.props && this.props.elements) {
            this.menuElements = this.props && this.props.elements;
        } else {
            this.menuElements = [];

            this.pages
                .forEach((page: PageController<object>) => {
                    const menuElement: MenuElement = new MenuElement(page.title, page.route);
                    this.menuElements.push(menuElement);
                });
        }
        this.redraw();
    }

    public async getCurrentUser(): Promise<void> {
        try {
            this.redraw();
        } catch (err) {
            // alertify.error(`NavigationMenuController.getCurrentUser: error on user request ${err}`);
        }
    }

}
