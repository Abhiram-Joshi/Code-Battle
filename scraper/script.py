from selenium import webdriver

from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from dbcon import add_to_db, add_topic

from dotenv import dotenv_values
paths = dotenv_values("../paths.env")

options = Options()
options.add_argument("start-maximized")
options.add_argument("disable-infobars")
browser = webdriver.Chrome(service=Service(f"{paths['CHROMEDRIVER_PATH']}"), chrome_options=options)

url = "https://www.codechef.com/practice?page=0&limit=20&sort_by=difficulty_rating&sort_order=asc&search=&start_rating=0&end_rating=5000&topic={0}&tags=&group=all"

browser.get(url.format(""))

topics = [topic.text for topic in browser.find_elements(By.CLASS_NAME, "Tabs_specificTopics__heading__1nhhU")]

for topic in topics:
    new_url = url.format(topic)
    browser.get(new_url)

    question_urls = browser.find_elements(By.CLASS_NAME, "PracticePage_m-link__xLfvv")

    for question_url in question_urls:
        browser.get(question_url.get_attribute("href"))
        
        browser.implicitly_wait(2)
        
        problem_name = browser.find_element(By.CLASS_NAME, "TopBanner_problem__title__1nmUR").find_element(By.TAG_NAME, "span").text
        problem_statement = browser.find_element(By.ID, "problem-statement").get_attribute("innerHTML")

        difficulty_rating = int(browser.find_element(By.CLASS_NAME, "TopBanner_difficulty-ratings__box__2B35X").find_element(By.CLASS_NAME, "TopBanner_value__3DUbi").text)

        difficulty = "no sweat" if difficulty_rating < 1666 else "think different" if difficulty_rating < 3333 else "back-breaking"

        test_cases = {}
        input_output = browser.find_element(By.CLASS_NAME, "MarkdownPreview_values__container__sPYcw").find_elements(By.CLASS_NAME, "MarkdownPreview_values__1TjK6")

        browser.implicitly_wait(2)
        input_vals = input_output[0].find_element(By.TAG_NAME, "pre").text
        output_vals = input_output[1].find_element(By.TAG_NAME, "pre").text

        print(input_vals)
        print("#######")
        print(output_vals)

        add_topic(topic)
        add_to_db(problem_name, problem_statement, difficulty, topic, test_cases)
        add_to_db(problem_name, problem_statement, "easy", topic, {"test":"case"})


        break

    break
