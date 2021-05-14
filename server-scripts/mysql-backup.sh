sudo mysqldump --defaults-extra-file=/etc/mysql/mysqlpassword.cnf -u root peDatabase | gzip > /home/projekt/backups/database-backup/peDatabse_`date +%F`.sql.gz


