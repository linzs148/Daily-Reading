import bs4
import requests
from bs4 import BeautifulSoup
# headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ''Chrome/67.0.3396.99 Safari/537.36'}
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
# url="https://book.douban.com/subject/35447940/"
url ="https://book.douban.com/subject/10510102/"
r = requests.get(url, headers=headers)
r.raise_for_status()
r.encoding = r.apparent_encoding
soup = BeautifulSoup(r.text, 'html.parser')
article = soup.find('div', class_='article')
related_info = article.find('div', class_='related_info')
tmp = article.find('strong', class_='ll rating_num', property='v:average').string
a=len(str(tmp))
intro = ''
score = -1
if len(str(tmp))>1:
    score = float(tmp)
print(score)