# Locker-Client
This is the front-end client application for the package locker system, which is hosted on a Nginx server on the Raspberry Pi.

## Nginx Setup (On Raspberry Pi)
1.  Install Nginx

	`sudo apt install nginx`

2. Set up the following permissions

	```
	sudo mkdir /var/www/locker-client
	sudo chmod 755 -R /var/www/locker-client/
	sudo chown -R pi:www-data /var/www/locker-client/
	```

3. Create a config file (with the following configurations)

	```
	sudo nano /etc/nginx/sites-available/locker-client
	```

	```
	server {
	        listen 80;
	        listen [::]:80;

	        root /var/www/locker-client;
	        index index.html;

          location /api {
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_pass         http://127.0.0.1:8000/;
        }
	}
	```

4. Unlink default config file and link new config file

	```
	sudo unlink /etc/nginx/sites-enabled/default
	sudo ln -s /etc/nginx/sites-available/locker-client /etc/nginx/sites-enabled
	```

5. Test config and restart nginx

	```
	sudo nginx -t
	sudo systemctl restart nginx
	```

## Deploy Application (On Dev Machine)

*make sure the IP address is set correctly in `deploy.sh`*

1. Clone repo to local dev machine and install dependencies `npm install`

2. Run `./deploy.sh`

The site should now be accessible at `http://<pi-ip>`