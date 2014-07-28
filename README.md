extjs-in-action-examples
========================

Ext JS in Action SE Examples from http://manning.com/garcia3/


Installation instructions
--

1. Clone the repo
```
git clone https://github.com/ModusCreateOrg/extjs-in-action-examples.git ./your_path_of_choice
```

2. Create a virtual site (optional, but advised) based on what ever web server you use.  An example apache vhost (assumes http://ext4ia):
```
<VirtualHost  *:80>
    ServerAdmin liquid@localhost
    DocumentRoot /www/ext4ia
    ServerName ext4ia
    ServerAlias ext4ia
    ErrorLog /tmp/ext4ia.httpd.errlog
    <Directory /www/ext4ia>
      AllowOverride All
      Options ExecCGI FollowSymLinks
      Order allow,deny
      Allow from all
    </Directory>
</VirtualHost>
```

3. Visit your virtual host via http://myvirtualhost/examples/ch01 (or http://extjsinaction.com/v4/examples/);

Chapter 14 instructions
--
1. Make sure you have Sencha Cmd 4+ installed (works with Cmd 5 as well)
2. Open terminal
3. Navigate to Ch 14 `/path/to/ch14`
4. Execute `sencha app build`. This command will build CSS files and work out the dependencies.
5. Point your browser to ch14

Running examples without a web server
--
We need a web server set up for two reasons. Some examples need external services/data, so we provide with php scripts for your convenience. Those require a PHP-enabeled server.

Also, XHR (AJAX) is required for Ext.Loader to fetch dependencies. Due to security considerations, XHR only works in HTTP(s), thus requiring a web server.

Examples that do not require external data (PHP) can also be executed in Google Chrome with security turned off. [This post](http://stackoverflow.com/a/6083677/857756) outlines how to run it on Mac OS, Linux, and Windows.

Once you have Chrome running in this mode, just open html files as you would normally do from your Finder, Windows Explorer, Terminal, or elsewhere.  
