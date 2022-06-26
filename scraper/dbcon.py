from dotenv import dotenv_values

from pymongo import MongoClient

def get_db():
    config = dotenv_values("creds.env")

    CONNECTION_STRING = f"mongodb+srv://{config['MONGODB_USERNAME']}:{config['MONGODB_PASSWORD']}@code-battle.sju91.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(CONNECTION_STRING)

    return client["Code-Battle"]


def add_topic(topic):
    db = get_db()

    db.topics.insert_one({"name": topic})


def add_to_db(problem_name, problem_statement, difficulty, topic, test_cases):
    db = get_db()

    topic_id = db.topics.find_one({"name": topic})["_id"]

    a = db.questions.insert_one({
        "name": problem_name,
        "stmt": problem_statement,
        "difficulty": difficulty,
        "topic": topic_id,
        "test_cases": test_cases
    })