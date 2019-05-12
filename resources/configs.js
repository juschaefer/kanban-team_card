/**
 * @overview configurations of ccm component for kanban card
 * @author Julian Schäfer <Julian.Schaefer@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

const LOCAL_DATA_SERVER = "http://192.168.99.101:8080";
const HBRS_CCM2_DATA_SERVER = "https://ccm2.inf.h-brs.de";

ccm.files['configs.js'] = {

    "local": {
        "key": "local",
        "data_server": LOCAL_DATA_SERVER,
        "project": "jschae2s_sose_19_prototyp",
        "data": {
            "store": ["ccm.store", {"name": "jschae2s_kanban_team_cards", "url": LOCAL_DATA_SERVER}],
        },
        "comment_store": ['ccm.store', {"name": "jschae2s_comments", "url": LOCAL_DATA_SERVER}],
        "logger": ["ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", {
            "logging": {
                "data": true,
                "browser": true,
                "parent": true,
                "root": true,
                "user": true,
                "website": true
            },
            "events": {
                "start": {
                    "data": true,
                    "user": true
                },
                "change": {
                    "data": true,
                    "user": true
                }
            },

            "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
            "onfinish": {
                "store": {
                    "settings": {"name": "jschae2s_sose_19_prototyp_team-card-details", "url": LOCAL_DATA_SERVER},
                }
            },
        }]
    },

    "jschae2s_demo": {
        "key": "jschae2s_demo",
        "data_server": HBRS_CCM2_DATA_SERVER,
        "project": "jschae2s_demo",
        "data": {
            "store": ["ccm.store", {"name": "jschae2s_kanban_team_cards", "url": HBRS_CCM2_DATA_SERVER}],
        },
        "comment_store": ['ccm.store', {"name": "jschae2s_comments", "url": HBRS_CCM2_DATA_SERVER}],
    "logger": ["ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", {
        "logging": {
            "data": true,
            "browser": true,
            "parent": true,
            "root": true,
            "user": true,
            "website": true
        },
        "events": {
            "start": {
                "data": true,
                "user": true
            },
            "change": {
                "data": true,
                "user": true
            }
        },

        "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
        "onfinish": {
            "store": {
                "settings": {"name": "jschae2s_demo_team-card-details", "url": HBRS_CCM2_DATA_SERVER},
            }
        },
    }]
    }

};