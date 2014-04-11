extjs-in-action-examples
========================

Ext JS in Action SE Examples from http://manning.com/garcia3/


**Installation instructions**

1) Clone the repo
```
git clone https://github.com/ModusCreateOrg/extjs-in-action-examples.git ./your_path_of_choice
```

2) Create a virtual site (optional, but advised) based on what ever web server you use.  An example apache vhost (assumes http://ext4ia):
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

3) Visit your virtual host via http://myvirtualhost/examples/ch01 (or http://extjsinaction.com/v4/examples/);

