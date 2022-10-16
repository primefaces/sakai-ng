import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
    templateUrl: './menus.component.html',
    styles: [`
        :host ::ng-deep .p-menubar-root-list {
            flex-wrap: wrap;
        }
    `]
})
export class MenusComponent implements OnInit {

    breadcrumbItems: MenuItem[] = [];

    tieredItems: MenuItem[] = [];

    items: MenuItem[] = [];

    routeItems: MenuItem[] = [];

    megaMenuItems: MegaMenuItem[] = [];

    panelMenuItems: MenuItem[] = [];

    stepsItems: MenuItem[] = [];

    slideItems: MenuItem[] = [];

    menuItems: MenuItem[] = [];

    plainMenuItems: MenuItem[] = [];

    pageIndex: number = 0;

    ngOnInit() {
        this.tieredItems = [
            {
                label: 'Customers',
                icon: 'pi pi-fw pi-table',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Customer',
                                icon: 'pi pi-fw pi-plus'
                            },
                            {
                                label: 'Duplicate',
                                icon: 'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Orders',
                icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Shipments',
                icon: 'pi pi-fw pi-envelope',
                items: [
                    {
                        label: 'Tracker',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Map',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Manage',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Billing',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            },
            { separator: true },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-sign-out'
            }
        ];

        this.items = [
            {
                label: 'Customers',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Orders',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Shipments',
                items: [
                    {
                        label: 'Tracker',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Map',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Manage',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            }
        ];

        this.menuItems = [
            {
                label: 'Save', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Update', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Home', icon: 'pi pi-fw pi-home'
            },
        ];

        this.slideItems = [
            {
                label: 'Customers',
                icon: 'pi pi-fw pi-table',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Orders',
                icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Shipments',
                icon: 'pi pi-fw pi-envelope',
                items: [
                    {
                        label: 'Tracker',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Map',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Manage',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Billing',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            }
        ];

        this.plainMenuItems = [
            {
                label: 'Customers',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Orders',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            }
        ];

        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Electronics' });
        this.breadcrumbItems.push({ label: 'Computer' });
        this.breadcrumbItems.push({ label: 'Notebook' });
        this.breadcrumbItems.push({ label: 'Accessories' });
        this.breadcrumbItems.push({ label: 'Backpacks' });
        this.breadcrumbItems.push({ label: 'Item' });

        this.routeItems = [
            { label: 'Personal', routerLink: 'personal' },
            { label: 'Seat', routerLink: 'seat' },
            { label: 'Payment', routerLink: 'payment' },
            { label: 'Confirmation', routerLink: 'confirmation' },
        ];

        this.megaMenuItems = [
            {
                label: 'Fashion', icon: 'pi pi-fw pi-tag',
                items: [
                    [
                        {
                            label: 'Women',
                            items: [{ label: 'Women Item' }, { label: 'Women Item' }, { label: 'Women Item' }]
                        },
                        {
                            label: 'Men',
                            items: [{ label: 'Men Item' }, { label: 'Men Item' }, { label: 'Men Item' }]
                        }
                    ],
                    [
                        {
                            label: 'Kids',
                            items: [{ label: 'Kids Item' }, { label: 'Kids Item' }]
                        },
                        {
                            label: 'Luggage',
                            items: [{ label: 'Luggage Item' }, { label: 'Luggage Item' }, { label: 'Luggage Item' }]
                        }
                    ]
                ]
            },
            {
                label: 'Electronics', icon: 'pi pi-fw pi-desktop',
                items: [
                    [
                        {
                            label: 'Computer',
                            items: [{ label: 'Computer Item' }, { label: 'Computer Item' }]
                        },
                        {
                            label: 'Camcorder',
                            items: [{ label: 'Camcorder Item' }, { label: 'Camcorder Item' }, { label: 'Camcorder Item' }]
                        }
                    ],
                    [
                        {
                            label: 'TV',
                            items: [{ label: 'TV Item' }, { label: 'TV Item' }]
                        },
                        {
                            label: 'Audio',
                            items: [{ label: 'Audio Item' }, { label: 'Audio Item' }, { label: 'Audio Item' }]
                        }
                    ],
                    [
                        {
                            label: 'Sports.7',
                            items: [{ label: 'Sports.7.1' }, { label: 'Sports.7.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Furniture', icon: 'pi pi-fw pi-image',
                items: [
                    [
                        {
                            label: 'Living Room',
                            items: [{ label: 'Living Room Item' }, { label: 'Living Room Item' }]
                        },
                        {
                            label: 'Kitchen',
                            items: [{ label: 'Kitchen Item' }, { label: 'Kitchen Item' }, { label: 'Kitchen Item' }]
                        }
                    ],
                    [
                        {
                            label: 'Bedroom',
                            items: [{ label: 'Bedroom Item' }, { label: 'Bedroom Item' }]
                        },
                        {
                            label: 'Outdoor',
                            items: [{ label: 'Outdoor Item' }, { label: 'Outdoor Item' }, { label: 'Outdoor Item' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'pi pi-fw pi-star',
                items: [
                    [
                        {
                            label: 'Basketball',
                            items: [{ label: 'Basketball Item' }, { label: 'Basketball Item' }]
                        },
                        {
                            label: 'Football',
                            items: [{ label: 'Football Item' }, { label: 'Football Item' }, { label: 'Football Item' }]
                        }
                    ],
                    [
                        {
                            label: 'Tennis',
                            items: [{ label: 'Tennis Item' }, { label: 'Tennis Item' }]
                        }
                    ]
                ]
            },
        ];

        this.panelMenuItems = [
            {
                label: 'Customers',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Customer',
                                icon: 'pi pi-fw pi-plus'
                            },
                            {
                                label: 'Duplicate',
                                icon: 'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Orders',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Shipments',
                items: [
                    {
                        label: 'Tracker',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Map',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Manage',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog'
                    },
                    {
                        label: 'Billing',
                        icon: 'pi pi-fw pi-file'
                    }
                ]
            }
        ];
    }

}
