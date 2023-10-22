Torscraper


sudo apt install tor

Next, edit the Tor configuration file /etc/tor/torrc and uncomment the following lines:
    ControlPort 9051
    CookieAuthentication 1

Change 1 to 0 in the CookieAuthentication line. Save the file and restart the Tor service by running the following command:

sudo /etc/init.d/tor restart

Now, you can use the torify command to run any command through Tor. To download the Tor Browser using curl through Tor, run the following command:
    torify curl -O https://www.torproject.org/dist/torbrowser/13.0/tor-browser-linux64-13.0_en-US.tar.xz

Wait for the download to complete. The file will be saved in your current working directory.

----------------------------------------------------------------------------------
pip install virtualenv
python -m venv myenv
source myenv/bin/activate


sudo pip3 install -r requirements.txt


tor --hash-password "swmdarkweb123"

16:EE369D8A66E205BA60A3553D34302BA6CA7E72C56CFE2723D5B6C4D141

replaced the hash with the above in TorScrapper/Modules/Scraper/Scrape.py

python Modules/Scraper/Scrape.py

pip install beautifulsoup4
pip install stem
pip install PySocks

mkdir -p TorScrapper/Output

successfully ran this.

    python Modules/Scraper/Scrape.py  http://torlinksge6enmcyyuxjpjkoouw4oorgdgeo7ftnq3zodj7g2zxi3kyd.onion/

---------------------------------------------------------------------------------------------------------------------

solr


curl -O https://www.apache.org/dyn/closer.lua/solr/solr/9.4.0/solr-9.4.0.tgz


tar -xvzf  solr-9.4.0.tgz

myenv) root@goorm:/workspace/DarkWebScraper/solr-9.4.0-slim/bin# ./solr start
\

Your current version of Java is too old to run this version of Solr.
We found major version 8, using command 'java -version', with response:
openjdk version "1.8.0_272"
OpenJDK Runtime Environment (build 1.8.0_272-8u272-b10-0ubuntu1~18.04-b10)
OpenJDK 64-Bit Server VM (build 25.272-b10, mixed mode)

Please install latest version of Java 11 or set JAVA_HOME properly.

Debug information:
JAVA_HOME: N/A
Active Path:
/workspace/DarkWebScraper/TorScrapper/myenv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
(myenv) root@goorm:/workspace/DarkWebScraper/solr-9.4.0-slim/bin# \



