# Torscraper Dev history

## install tor

    sudo apt install tor

Next, edit the Tor configuration file /etc/tor/torrc and uncomment the following lines:

    ControlPort 9051
    CookieAuthentication 1

Change 1 to 0 in the CookieAuthentication line. Save the file and restart the Tor service by running the following command:

    sudo /etc/init.d/tor restart

Now, you can use the torify command to run any command through Tor. To download the Tor Browser using curl through Tor, run the following command:

    torify curl -O https://www.torproject.org/dist/torbrowser/13.0/tor-browser-linux64-13.0_en-US.tar.xz

Wait for the download to complete. The file will be saved in your current working directory.

## Setup virtual environment:

    pip install virtualenv
    python -m venv TorScrapper_venv
    source TorScrapper_venv/bin/activate

## Install TorScrapper:

    sudo pip3 install -r requirements.txt

configure:

    tor --hash-password "swmdarkweb123"

    16:EE369D8A66E205BA60A3553D34302BA6CA7E72C56CFE2723D5B6C4D141

replaced the hash with the above in TorScrapper/Modules/Scraper/Scrape.py

Test TorScrapper:

    pip install beautifulsoup4
    pip install stem
    pip install PySocks

    mkdir -p TorScrapper/Output

    python TorScrapper/Modules/Scraper/Scrape.py  http://torlinksge6enmcyyuxjpjkoouw4oorgdgeo7ftnq3zodj7g2zxi3kyd.onion/

_Note:_ If you get a connection refused error like this: `ConnectionRefusedError: [Errno 111] Connection refused`, make sure that tor service is running, and try again.

## solr

curl -O https://www.apache.org/dyn/closer.lua/solr/solr/9.4.0/solr-9.4.0.tgz

tar -xvzf solr-9.4.0.tgz

Ran

    ./solr start

got this error:

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

fix: update java version

    sudo apt update

    sudo apt-get install openjdk-11-jdk

running solr:

    ./solr-9.4.0-slim/bin/solr start -force
    *** [WARN] *** Your open file limit is currently 1024.
     It should be set to 65000 to avoid operational disruption.
     If you no longer wish to see this warning, set SOLR_ULIMIT_CHECKS to false in your profile or solr.in.sh
    ./solr-9.4.0-slim/bin/solr: line 2408: bc: command not found
    NOTE: Please install lsof as this script needs it to determine if Solr is listening on port 8983.

    Started Solr server on port 8983 (pid=2153). Happy searching!

    ./solr-9.4.0-slim/bin/solr stop -force

## pysolr

reference: https://github.com/AshwinAmbal/DarkWeb-Crawling-Indexing/tree/master

    pip install pysolr

    ./solr-9.4.0-slim/bin/solr stop -force

    ./solr-9.4.0-slim/bin/solr start -e cloud -force

Gave default values for the prompts in the above command.
installed the required packages for making the above command work:

    sudo apt-get install bc
    sudo apt-get install lsof

unable to access the "gettingstarted" core in the above command..

Able to access the darkwebcore that i gave earlier.

    solr = pysolr.Solr('http://localhost:8983/solr/darkwebcore', timeout=10)

```python
import pysolr

# Setup a Solr instance. The timeout is optional.
# solr = pysolr.Solr('http://localhost:8983/solr/', timeout=10)
solr = pysolr.Solr('http://localhost:8983/solr/darkwebcore', timeout=10)


# Do a health check.
solr.ping()

# # How you'd index data.
solr.add([
    {
        "id": "doc_1",
        "title": "A test document",
    },
])

# Traverse a cursor using its iterator:
for doc in solr.search('*:*',fl='id',sort='id ASC',cursorMark='*'):
    print(doc['id'])


for doc in solr.search('*:*',fl='title'):
    print(doc['title'])


# ...or all documents.
# solr.delete(q='*:*')
```

forked and cloned own copy of torscrapper

    git clone https://github.com/Rama4/TorScrapper.git

added submodule

    git submodule add https://github.com/Rama4/TorScrapper.git TorScrapper

added TorScrapper authentication hash in env

    pip install python-dotenv
