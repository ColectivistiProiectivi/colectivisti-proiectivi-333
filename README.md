### Backend App Requirements and Setup:
JAVA VERSION: 17<br/>
MYSQL VERSION: mysql-installer-community-8.0.31.0 (https://dev.mysql.com/downloads/file/?id=514518)

<strong>MAKE SURE TO UNINSTALL ANY PREVIOUS MYSQL SERVER VERSION AND ANY RELATED APPLICATIONS!</strong>

Setup Type-> Custom -> Choose the Server, the MYSQL Workbench and the connector/j so in the products to be installed you should see 3 entries:
- MYSQL Server 8.0.31
- MySQL Workbench 8.0.31
- Connector/J 8.0.31

Go Next, hit execute and wait for everything to be installed. <br/>
Go next and the server configuration will begin. <br/>
On the Type and Networking page leave everything as it is by default and hit next.<br/>
On the Authentication Method page default and hit next.<br/>
On the accounts and roles we need to choose a password for the root user. Let's use "root" and hit next.<br/>
On the Windows Service page leave everything as it is and hit next.<br/>
Next page leave everything as default and hit next.<br/>
On the last page hit execute and wait for everything to finish.<br/>
After everything finished hit "Finish".

Start mysql workbench after we finished the setup.
Login to the root user using the "root" password we just set and tick "save in the vault" to have our password remembered.
The workbench page will appear and let's select from the MANAGEMENT PANEL the "Schemas" tab and let's create another schema(database).
Click the fourth icon from the left under the Menu(File, Edit, View, etc.)
For the name of the schema use "mp" hit apply and apply again in the window that appeared. Congratulations you have created a new database.
