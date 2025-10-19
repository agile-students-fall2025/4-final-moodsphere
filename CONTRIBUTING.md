# Contributing to MoodSphere

This document outlines our team norms, workflows, and contribution guidelines. MoodSphere is being developed through an Agile framework, emphasizing collaboration, accountability, and thoughtful design. Our team strives to maintain high standards of communication, consistency, and quality throughout each sprint.

## Team Values and Norms

Our team is committed to collaboration, accountability, and writing clean, maintainable code. We prioritize communication, respect, and openness to feedback as we build together.

### Team Collaboration
- We communicate regularly through our group chat and scheduled weekly meetings.  
- Daily standups last 10–15 minutes to share progress, blockers, and next steps.  
- Team members are expected to respond to messages within **24 hours**.  
- If a member is struggling with a task, they are encouraged to reach out early for support.  
- Conflicts are resolved through **open discussion and majority consensus**.  

### Sprint Cadence
- Each sprint runs for **two weeks**, balancing productivity with sustainability.  
- Sprint Planning occurs at the beginning of each sprint to define the Sprint Backlog.  
- Sprint Reviews happen at the end of each sprint to assess progress and improve processes.  
- Roles such as **Scrum Master** and **Product Owner** rotate each sprint so every team member gains experience in leadership. 

## Coding Standards and Best Practices

All code contributions must:
- Be **peer-reviewed** before merging into `main`.  
- Pass all existing **tests and build checks**.  
- Include **clear, descriptive commit messages**.  
- Use **readable, self-documenting variable and function names**.  
- Follow consistent formatting, indentation, and naming conventions.  

When working on a new feature or fix, developers should create a dedicated **feature branch**, make commits frequently, and submit a **Pull Request** for review.

## GitHub Workflow

MoodSphere follows a structured GitHub workflow to ensure transparency and traceability.

### Labels
Each issue must have one of the following labels:
- `user story` — used for feature definitions and requirements.  
- `task` — used for actionable development or setup work.  
- `spike` — used for research, exploration, or technical investigation.  

Additional custom labels may be created as needed (e.g., `frontend`, `backend`, `documentation`).

### Milestones
The team uses milestones to organize work by sprint:
- Sprint 0 — Project setup and planning  
- Sprint 1 — Initial development and backend setup  
- Sprint 2 — Feature expansion and UI improvements  
- Sprint 3 — Testing and integration  
- Sprint 4 — Final polish and presentation  

## Product Backlog and Issue Tracking

Our **Product Backlog** contains all User Stories that define project requirements and user-facing features.  
Each User Story:
- Is added as a GitHub Issue with the label `user story`.  
- Follows the standard format:  
  > *As a [type of user], I want to [do something] so that [goal or reason].*  
- May include **Acceptance Criteria** and **Effort Estimation** (using Planning Poker).

From each User Story, the team breaks down smaller **Tasks** (implementation work) and **Spikes** (research or setup).  
Each of these is created as its own Issue and linked to the parent User Story by referencing its Issue number.

## Project Board and Workflow

Each sprint has its own **Task Board** under the GitHub “Projects” tab, with columns to visualize progress:
- **Backlog** – Unstarted stories and tasks.  
- **To Do** – Ready to be worked on.  
- **In Progress** – Currently being developed.  
- **In Review** – Undergoing code review or testing.  
- **Done** – Completed work that meets acceptance criteria.
Team members move issues through these columns as work progresses.

## Accountability

- If a member shows no visible progress for two consecutive standups and has not communicated effectively, the team will check in and reassign or assist as needed.  
- All members are responsible for maintaining a respectful, inclusive, and supportive environment.  
- Transparency and teamwork are expected from everyone, regardless of role or sprint responsibilities.  

## How to Get Started

1. **Clone** the repository and set up your local environment.  
2. **Create a new branch** for each feature or fix you’re working on.  
3. **Commit frequently** with clear messages describing your changes.  
4. **Push your branch** and open a Pull Request for review.  
5. **Tag issues** with the appropriate label and milestone before merging.  
6. **Merge** into `main` only after approval and successful build checks.

By following these guidelines, we ensure MoodSphere continues to grow as a reliable, maintainable, and collaborative project that reflects our shared dedication to mental health awareness and thoughtful software design.

