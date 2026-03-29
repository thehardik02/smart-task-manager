from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []
task_id = 1

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def create_task():
    global task_id
    data = request.json

    if not data.get("title"):
        return jsonify({"error": "Title required"}), 400

    task = {
        "id": task_id,
        "title": data["title"],
        "completed": False
    }
    task_id += 1
    tasks.append(task)
    return jsonify(task)

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    global tasks
    tasks = [t for t in tasks if t["id"] != id]
    return jsonify({"message": "Deleted"})

@app.route("/tasks/<int:id>/ai-suggest", methods=["POST"])
def ai_suggest(id):
    task = next((t for t in tasks if t["id"] == id), None)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    title = task["title"].lower()

    # Rule-based AI (fast + reliable)
    if "study" in title or "exam" in title:
        suggestions = [
            "Break topic into chapters",
            "Revise notes",
            "Solve practice questions",
            "Take a mock test"
        ]

    elif "gym" in title or "workout" in title:
        suggestions = [
            "Start with warm-up",
            "Do main workout sets",
            "Take proper rest",
            "End with stretching"
        ]

    elif "project" in title or "code" in title:
        suggestions = [
            "Understand requirements",
            "Break into modules",
            "Implement step-by-step",
            "Test your code"
        ]

    elif "meeting" in title:
        suggestions = [
            "Prepare agenda",
            "List discussion points",
            "Take notes",
            "Summarize outcomes"
        ]

    else:
        suggestions = [
            "Break task into smaller steps",
            "Set a deadline",
            "Start with easiest part"
        ]

    return jsonify({"suggestions": suggestions})

if __name__ == "__main__":
    app.run(debug=True)