To run the serverside php + mysql example code in this chapter you need php5 and mysql support.


Installing the software
-----------------------

On ubuntu linux you can install the required files like this as root:

apt-get install php5-mysqlnd php5-json

On Mac osx you can use homebrew (further instructions at http://brew.sh )

On windows you can use the installers available from php.net and mysql.com


Mysql database setup
--------------------

The example file crud.php assumes that you have a database called "extjsinaction" accessible as user root with no pasword. Feel free to change this to your liking.

You can find further instructions on user account management in section 6.3 in the mysql manual (available here: http://dev.mysql.com/doc/refman/5.6/en/user-account-management.html )



Tweaking the datastores to run locally
--------------------------------------

In 7.5_The_Employee_Store.html you can tweak urlRoot to match your local crud.php installation.  Just remove "http://extjsinaction.com/" from urlRoot and you should pickup you local file. Remember to alter the proxy type from "jsonp" to "ajax" now that you are running locally. Now you should be able to experiment with datastores from your console in your browser.



