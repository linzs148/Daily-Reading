import requests
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                         'Chrome/67.0.3396.99 Safari/537.36'}


def get_bookURLlist(url):
    try:
        list = []
        r = requests.get(url, headers=headers)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
        soup = BeautifulSoup(r.text, 'html.parser')
        for item in soup.findAll("li", class_="subject-item"):
            list.append(item.find('div', class_='info').find('a')['href'])
    except:
        print("fail")
    return list


if __name__ == '__main__':
    # URLTag_list = ["科幻"]
    URLTag_list = ["科幻", "推理", "言情", "武侠", "计算机", "经济学", "儿童文学", "社会", "艺术", "政治", "职场", "教育", "科技", "悬疑", "心理"]
    URL = "https://book.douban.com/tag/"
    fileName = "D:\\大学课程资源\\计网\\大作业—仿豆瓣微信小程序\\craweper_douban\\url link.txt"
    with open(fileName, mode='w', encoding='utf-8') as f:
        tag_index = 0;
        for tag in URLTag_list:
            for book_url in get_bookURLlist(URL + tag):
                f.write(book_url + " " + str(tag_index) + "\n")
            tag_index = tag_index + 1
