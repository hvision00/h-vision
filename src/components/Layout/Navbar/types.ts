export interface MenuColumn {
    title: string;
    items: MenuItem[];
  }
  
  export interface MenuItem {
    label: string;
    href: string;
    description?: string;
  }
  
  export interface MegaMenuData {
    menu1: MenuColumn;
    catalogo: MenuColumn;
    info: MenuColumn;
  }
  
  export interface NavLink {
    label: string;
    href: string;
    megaMenu?: MegaMenuData;
  }