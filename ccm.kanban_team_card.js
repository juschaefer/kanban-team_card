/**
 * @overview ccm component for kanban card
 * @author André Kless <andre.kless@web.de> 2016-2018
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (31.10.2018)
 * - uses ccm v18.2.0
 * - removed privatization of instance members
 * - changes in default HTML templates
 * - changed editing behaviour of kanban card title and summary
 * - removed font-awesome lib from default config
 * - svg icons for kanban card owner and deadline
 * - added getValue method
 * - removed status icon
 * version 1.0.0 (19.10.2017)
 */

(function () {

    const component = {

        name: 'kanban_team_card',

        //ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.2.0.js',

        "jquery": [
            "ccm.load", {
                "url": "https://code.jquery.com/jquery-3.3.1.slim.min.js",
                "integrity": "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
                "crossorigin": "anonymous"
            }
        ],

        "propper": [
            "ccm.load", {
                "url": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
                "integrity": "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49",
                "crossorigin": "anonymous"
            }
        ],


        "bootstrap": [
            "ccm.load", {
                "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
                "integrity": "sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em",
                "crossorigin": "anonymous"
            }, {
                "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
                "crossorigin": "anonymous"
            }
        ],

        config: {

            "html": {
                "id": "main",
                "inner": [
                    {
                        "id": "header",
                        "inner": [
                            {
                                "id": "title",
                                "class": "entry",
                                "inner": [
                                    {
                                        "class": "value",
                                        "inner": "%title%",
                                        "contenteditable": "%editable%",
                                        "oninput": "%oninput_title%",
                                        "onblur": "%onblur_title%"
                                    }
                                ]
                            },
                            {
                                "id": "owner",
                                "class": "entry",
                                "inner": [
                                    {
                                        "class": "value",
                                        "inner": "%owner%",
                                        "contenteditable": "%editable%",
                                        "onfocus": "%onfocus_owner%"
                                    },
                                    {
                                        "inner": {
                                            "tag": "img",
                                            "src": "%icon_owner%"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "body",
                        "inner": {
                            "id": "summary",
                            "class": "entry",
                            "inner": {
                                "class": "value",
                                "inner": "%summary%",
                                "contenteditable": "%editable%",
                                "oninput": "%oninput_summary%",
                                "onblur": "%onblur_summary%"
                            }
                        }
                    },
                    {
                        "id": "footer",
                        "inner": [
                            {
                                "id": "priority",
                                "class": "entry",
                                "inner": {
                                    "class": "value",
                                    "inner": "%priority%",
                                    "contenteditable": "%editable%",
                                    "onfocus": "%onfocus_priority%"
                                }
                            },
                            {
                                "id": "deadline",
                                "class": "entry",
                                "inner": [
                                    {
                                        "class": "value",
                                        "inner": "%deadline%",
                                        "contenteditable": "%editable%",
                                        "onfocus": "%onfocus_deadline%"
                                    },
                                    {
                                        "inner": {
                                            "tag": "img",
                                            "src": "%icon_deadline%"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "css": ["ccm.load", "https://ccmjs.github.io/akless-components/kanban_card/resources/default.css"],
            "data": {},
            "editable": true,
            "members": ["John", "Jane"],
            "priorities": ["A", "B", "C"],
            "icon": {
                "owner": "https://ccmjs.github.io/akless-components/kanban_card/resources/owner.svg",
                "deadline": "https://ccmjs.github.io/akless-components/kanban_card/resources/deadline.svg"
            }

            //  "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
            //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
            //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

        },

        Instance: function () {

            let $, data;

            this.init = async () => {

                // set shortcut to help functions
                $ = this.ccm.helper;

                // listen to datastore changes => restart
                if ($.isObject(this.data) && $.isDatastore(this.data.store)) this.data.store.onchange = this.start;

            };

            this.ready = async () => {

                // logging of 'ready' event
                this.logger && this.logger.log('ready', $.privatize(this, true));

            };

            this.start = async () => {
                // get kanban card data
                data = await $.dataset(this.data);
                // console.log("Data: ", data);

                // logging of 'start' event
                this.logger && this.logger.log('start', $.clone(data));

                // render main HTML structure
                $.setContent(this.element, $.html(this.html, $.integrate({

                    title: '',
                    owner: '',
                    summary: '',
                    priority: '',
                    deadline: '',

                    icon_owner: this.icon.owner,
                    icon_deadline: this.icon.deadline,

                    editable: !!this.editable,

                    oninput_title: function () {
                        update('title', this.innerText.replace(/\n/g, ''));
                    },
                    onblur_title: function () {
                        this.innerHTML = data.title || ''
                    },
                    onfocus_owner: function () {
                        select(this, true);
                    },
                    oninput_summary: function () {
                        update('summary', this.innerText.replace(/\n/g, ''));
                    },
                    onblur_summary: function () {
                        this.innerHTML = data.summary || ''
                    },
                    onfocus_priority: function () {
                        select(this, false);
                    },
                    onfocus_deadline: function () {
                        input(this);
                    }

                }, data, true)));

                const self = this;

                /**
                 * updates value of a changed kanban card property
                 * @param {string} prop - changed kanban card property
                 * @param {string} value - changed kanban card value
                 * @returns {Promise}
                 */
                async function update(prop, value) {

                    // has user instance? => login
                    self.user && await self.user.login();

                    // update kanban card data
                    data[prop] = value.trim();
                    $.isObject(self.data) && $.isDatastore(self.data.store) && await self.data.store.set(data);

                    // logging of 'change' event
                    self.logger && self.logger.log('change', {prop: prop, value: value});

                    // perform individual 'change' callback
                    self.onchange && self.onchange.call(self, {prop: prop, value: value});

                }

                /**
                 * shows selector box for choosing owner or priority of kanban card
                 * @param {Element} elem - focused element for owner/priority
                 * @param {boolean} owner_or_prio - true: owner, false: priority
                 */
                function select(elem, owner_or_prio) {

                    /**
                     * initial selector box entries
                     * @type {Object[]}
                     */
                    const entries = [{tag: 'option'}];

                    // add selector box entry for each owner/priority
                    self[owner_or_prio ? 'members' : 'priorities'].forEach(entry => entries.push({
                        tag: 'option',
                        inner: entry,
                        selected: entry === data[owner_or_prio ? 'owner' : 'priority'] || ''
                    }));

                    // replace element for owner/priority with selector box
                    $.replace($.html({
                        tag: 'select', inner: entries, onchange: onChange, onblur: function () {
                            restore.call(this, elem);
                        }
                    }), elem);

                    // focus selector box
                    self.element.querySelector('select').focus();

                    /** when selector box value has changed */
                    function onChange() {

                        // set new value in original element
                        elem.innerHTML = this.value;

                        // update changed kanban card value
                        update(owner_or_prio ? 'owner' : 'priority', this.value);

                    }

                }

                /**
                 * shows input field for choosing deadline of kanban card
                 * @param {Element} elem - focused element for deadline
                 */
                function input(elem) {

                    // replace element for deadline with input field
                    $.replace($.html({
                        tag: 'input',
                        type: 'date',
                        value: data.deadline || '',
                        oninput: onInput,
                        onblur: function () {
                            restore.call(this, elem);
                        }
                    }), elem);

                    // focus input field
                    self.element.querySelector('input').focus();

                    /** when input field value has changed */
                    function onInput() {

                        // set new value in original element
                        elem.innerHTML = this.value;

                        // update changed kanban card value
                        update('deadline', this.value);

                    }

                }

                /**
                 * replaces input element with original element
                 * @this {Element} input element
                 * @param {Element} elem - original element
                 */
                function restore(elem) {

                    $.replace(elem, this);

                }

            };

            /**
             * returns current result data
             * @returns {Object} current kanban card data
             */
            this.getValue = () => data;

        }

    };

    let b = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[b]) return window.ccm.files[b] = component;
    (b = window.ccm && window.ccm.components[component.name]) && b.ccm && (component.ccm = b.ccm);
    "string" === typeof component.ccm && (component.ccm = {url: component.ccm});
    let c = (component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/) || ["latest"])[0];
    if (window.ccm && window.ccm[c]) window.ccm[c].component(component); else {
        var a = document.createElement("script");
        document.head.appendChild(a);
        component.ccm.integrity && a.setAttribute("integrity", component.ccm.integrity);
        component.ccm.crossorigin && a.setAttribute("crossorigin", component.ccm.crossorigin);
        a.onload = function () {
            window.ccm[c].component(component);
            document.head.removeChild(a)
        };
        a.src = component.ccm.url
    }
})();