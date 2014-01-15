RPC.REMOTING_API = {
    "url"           :"\/extdirect\/rpc.php",
    "type"          :"remoting",
    "namespace"     :"RPC",
    "descriptor"    :"RPC.REMOTING_API",
    "enableBuffer"  :1000,
    "actions":{
        "Actors":[
            {"name":"create",   "len":1},
            {"name":"read",     "len":1},
            {"name":"update",   "len":1},
            {"name":"destroy",  "len":1}
        ], "Util":[
            {"name":"date",     "len":1}
         ]
    }
};
Ext.Direct.addProvider(RPC.REMOTING_API);