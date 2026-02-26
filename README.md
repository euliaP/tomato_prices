# Tomato Price API & Automation Sandbox

## 📌 About This Project

This project serves as a hands-on technical sandbox for implementing and refining backend quality assurance practices, containerization, and continuous integration workflows. 

Rather than just testing an external public API, this repository contains its own containerized microservice—a simple Node.js and MongoDB application serving static tomato prices and images. Owning both the application code and the test suite provides a controlled environment to build a complete CI/CD pipeline from scratch, experiment with different testing strategies, and handle infrastructure configurations.

This repository is currently active and being developed to practise an iterative approach to software quality and automation.

## 🏗️ Architecture & Current State

The foundation of the application is currently deployed and containerized. 

**Current Infrastructure:**
* **Backend:** Node.js Express server (`/app/server.js`) with endpoints designed specifically to act as test targets.
* **Database:** MongoDB, integrated for data storage and retrieval.
* **Containerization:** Fully dockerized environment using `Dockerfile` and `docker-compose.yml` to spin up the application and database simultaneously.

## 🚀 Development & Testing Roadmap

The project is structured into progressive phases, moving from basic infrastructure validation to advanced automated testing frameworks.

### Phase 1: Foundation & Pipeline Integration (In Progress)
The goal of this phase is to establish the baseline application and a functional CI/CD feedback loop.
* [ ] **Frontend Integration:** Implement basic HTML pages to render the tomato data and provide a UI layer for future end-to-end testing.
* [ ] **Baseline API Testing:** Introduce a Python-based testing framework (`pytest`). 
    * Create initial structural tests focusing on endpoint availability, status code validation (e.g., 200 OK, 404 Not Found), and basic JSON schema checks.
* [ ] **CI/CD Implementation:** Configure GitHub Actions to automatically trigger the `pytest` suite upon any new commits or pull requests targeting the application code.

### Phase 2: Test Optimization & Deep Coverage
Once the pipeline is stable, the focus shifts to robust backend validation and framework optimization.
* [ ] **Advanced API Testing:** Expand the `pytest` suite to cover complex backend logic, edge cases, payload validation, and database state verification.
* [ ] **Framework Refactoring:** Optimize the test code utilizing pytest fixtures, parameterization, and modular design patterns for maintainability.

### Phase 3: UI Automation
* [ ] **End-to-End UI Testing:** Integrate **Playwright** to perform automated browser testing on the HTML frontend, validating the user journey and DOM rendering.

## 💻 Tech Stack

**Application:**
* Node.js / JavaScript
* MongoDB
* HTML/CSS (Upcoming)

**QA & Infrastructure:**
* Docker & Docker Compose
* Python
* Pytest (API Testing - Upcoming)
* GitHub Actions (CI/CD - Upcoming)
* Playwright (UI Testing - Upcoming)

## 🛠️ How to Run Locally

To spin up the application and database locally, ensure you have Docker and Docker Compose installed.

1. Clone the repository.
2. Navigate to the root directory.
3. Run the following command:
   ```bash
   docker-compose up --build

The API will be accessible at ```http://localhost:<PORT>```
