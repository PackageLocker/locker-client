echo "Building app..."
npm run build

echo "Deploying..."
scp -r build/* locker1@153.106.168.50:/var/www/locker-client/
# scp -r build/* pi@10.0.0.215:/var/www/locker-client/

echo "Done!"