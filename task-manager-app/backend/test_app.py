from app import app

def test_get_tasks():
    client = app.test_client()
    res = client.get("/tasks")
    assert res.status_code == 200

def test_create_task():
    client = app.test_client()
    res = client.post("/tasks", json={"title": "Test Task"})
    assert res.status_code == 200
    assert res.json["title"] == "Test Task"

def test_invalid_task():
    client = app.test_client()
    res = client.post("/tasks", json={})
    assert res.status_code == 400