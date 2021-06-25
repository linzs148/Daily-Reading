import csv
import time

import bs4
import requests
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                         'Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66'}


def get_book_info(bid, url, category):
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    r.encoding = 'utf-8'
    soup = BeautifulSoup(r.text, 'html.parser')
    article = soup.find('div', class_='article')
    bname = soup.find('h1').find('span').contents[0]
    author = article.find('div', id='info').find('a').contents[0]
    tmp0 = str(article.find('div', id='info'))
    tmp_index = tmp0.find('<span class="pl">ISBN:</span>')
    ISBN = tmp0[tmp_index + 29:tmp_index + 43]
    pic_link = article.find('div', id='mainpic').find('a')['href']
    related_info = article.find('div', class_='related_info')
    intro = '暂无简介'
    if related_info.find('div', class_='intro') is not None:
        temp = related_info.find('div', class_='indent')
        intro=''
        paragraph=[]
        if temp.find('span',class_='all hidden') is not None:
            paragraph=temp.find('span',class_='all hidden').findAll('p')
        else:
            paragraph = related_info.find('div', class_='intro').findAll('p')
        for p in paragraph:
            if p.string is not None:
                intro=intro+'\n'+p.string
    tmp = article.find('strong', class_='ll rating_num', property='v:average').contents[0]
    score = -1
    if len(str(tmp)) > 1:
        score = float(tmp)
    abstract = '暂无摘要'
    if related_info.find('div', class_='ugc-mod blockquote-list-wrapper') is not None:
        abstract = related_info.find('div', class_='ugc-mod blockquote-list-wrapper') \
            .find('ul', class_='blockquote-list').find('li').find('figure').contents[0]
    db_tags_section = related_info.find('div', class_='blank20', id='db-tags-section').find('div', class_='indent') \
        .findAll('span')
    tags = []
    for tag in db_tags_section:
        tags.append(tag.find('a').contents[0])
    tags_str = ' '.join(tags)

    turple = (bid, bname, category, author, pic_link, intro, str(abstract)[0:-1], tags_str, score, ISBN)
    return turple


def get_book_comment(url):
    list = []
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    r.encoding = 'utf-8'
    soup = BeautifulSoup(r.text, 'html.parser')
    article = soup.find('div', class_='article')
    related_info = article.find('div', class_='related_info')
    tmp0 = str(article.find('div', id='info'))
    tmp_index = tmp0.find('<span class="pl">ISBN:</span>')
    ISBN = tmp0[tmp_index + 29:tmp_index + 43]
    comments_section = related_info.find('div', id='comments-section')
    comment_list = comments_section.find('div', class_='comment-list new_score show', id="new_score")
    comments = comment_list.findAll('div', class_='comment')
    for comment in comments:
        username = comment.findAll('a')[1].string
        com = comment.find('span', class_='short').string
        turple = (ISBN, com, -1, username)
        list.append(turple)
    return list


file_path = 'D:\\大学课程资源\\计网\\大作业—仿豆瓣微信小程序\\craweper_douban\\url link.txt'
# 爬取books-表
with open('book_table_final.csv', 'w', encoding='utf-8-sig', newline='') as f:
    with open(file_path, mode='r', encoding='utf-8') as f1:
        lines = f1.readlines()
        i = 0
        # i = 131
        writer = csv.writer(f)
        colname = ('bid', 'bname', 'category', 'author', 'pic_link', 'intro', 'abstract', 'tags', 'score', 'ISBN')
        writer.writerow(colname)
        for line in lines:
            url = line.split(" ")[0]
            category = int(line.split(" ")[1])
            writer.writerow(get_book_info(i, url, category))
            print("一本书爬取完成" + " 编号" + str(i))
            i = i + 1
            time.sleep(2)

# with open('comment_table.csv', 'w', encoding='utf-8-sig', newline='') as f:
#     with open(file_path, mode='r', encoding='utf-8') as f1:
#         lines = f1.readlines()
#         i = 0
#         writer = csv.writer(f)
#         colname = ('ISBN', 'comment', 'uid', 'username')
#         writer.writerow(colname)
#         for line in lines:
#             url = line.split(" ")[0]
#             category = int(line.split(" ")[1])
#             writer.writerows(get_book_comment(url))
#             print("一本书评论爬取完成" + " 编号" + str(i))
#             i = i + 1
