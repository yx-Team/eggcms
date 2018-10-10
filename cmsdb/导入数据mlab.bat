mongoimport -h ds127843.mlab.com:27843 -d cmsdb -c role -u test -p du123456 --file ./cmsdb/role.json
mongoimport -h ds127843.mlab.com:27843 -d cmsdb -c access -u test -p du123456 --file ./cmsdb/access.json
mongoimport -h ds127843.mlab.com:27843 -d cmsdb -c admin -u test -p du123456 --file ./cmsdb/admin.json
mongoimport -h ds127843.mlab.com:27843 -d cmsdb -c role_access -u test -p du123456 --file ./cmsdb/role_access.json




