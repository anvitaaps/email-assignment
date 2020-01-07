import { myNavigation } from '@my/types';

export const navigation: myNavigation[] = [
    {
        id      : 'dashboard',
        title   : 'Applications',
        type    : 'group',
        icon    : 'dashboard',
        children: [
            {
                id      : 'dashboard',
                title   : 'Dashboards',
                type    : 'collapsable',
                icon    : 'dashboard',
                children: [
                    {
                        id   : 'login',
                        title: 'Login',
                        type : 'item',
                        url  : '/pages/auth/login'
                    }
                ]
            },
            {
                id      : 'dashboard',
                title   : 'Layouts',
                type    : 'item',
                icon    : 'all_out'
            },
            {
                id      : 'dashboard',
                title   : 'Graphs',
                type    : 'collapsable',
                icon    : 'bar_chart',
                children: [
                    {
                        id   : 'login',
                        title: 'Chart',
                        type : 'item',
                        url  : '/pages/auth/login'
                    }
                ]
            },
            {
                id      : 'dashboard',
                title   : 'Mailbox',
                type    : 'collapsable',
                icon    : 'email',
                children: [
                    {
                        id   : 'login',
                        title: 'Inbox',
                        type : 'item',
                        url  : '/mail/inbox',
                        badge    : {
                            title    : '25',
                            translate: 'NAV.MAIL.BADGE',
                            bg       : '#F44336',
                            fg       : '#FFFFFF'
                        }
                    },
                    {
                        id   : 'login',
                        title: 'Email view',
                        type : 'item',
                        url  : '/pages/auth/login'
                    },
                    {
                        id   : 'login',
                        title: 'Compose email',
                        type : 'item',
                        url  : '/pages/auth/login'
                    },
                    {
                        id   : 'login',
                        title: 'Email templates',
                        type : 'item',
                        url  : '/pages/auth/login'
                    }
                ]
            },
            {
                id   : 'login',
                title: 'Metrics',
                type : 'item',
                url  : '/pages/auth/login',
                icon : 'pie_chart'
            },
            {
                id   : 'login',
                title: 'Widgets',
                type : 'item',
                url  : '/pages/auth/login',
                icon : 'widgets'
            },
            {
                id      : 'dashboard',
                title   : 'Forms',
                type    : 'collapsable',
                icon    : 'forum',
                children: [
                    {
                        id   : 'login',
                        title: 'Chart',
                        type : 'item',
                        url  : '/pages/auth/login'
                    }
                ]
            },
            {
                id   : 'login',
                title: 'App Views',
                type : 'item',
                url  : '/pages/auth/login',
                icon : 'bar_chart'
            }
        ]
    }
];
