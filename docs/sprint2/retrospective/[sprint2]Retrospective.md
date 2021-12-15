# RETROSPECTIVE SPRINT 2 (Team P04)

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- 6 stories committed vs 6 stories done
- 32 points committed vs 32 done
- 113 hours estimated vs 115 spent (as a team)

Our Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed
- Sonar Quality Gate passing

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 11      | -      | 37h        | 36h          |
| 3     | 8       | 5      | 18h        | 14h          |
| 4     | 6       | 8      | 11h        | 12h 30m      |
| 5     | 8       | 3      | 14h 30m    | 14h 15m      |
| 6     | 7       | 3      | 12h 30m    | 12h 35m      |
| 7     | 4       | 8      | 9h         | 12h 50m      |
| 8     | 2       | 5      | 5h         | 2h 15m       |

- Hours per task (average, standard deviation): 2.5h avg per task, ~ 1.9h standard deviation
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table: 113/115 = 0.98

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 7h
  - Total hours spent: 5h
  - Nr of automated unit test cases: 36
  - Coverage (if available): 88.4%
- E2E testing:
  - Total hours estimated: 2h
  - Total hours spent: 1h 20m
- Code review
  - Total hours estimated: 2h 35m
  - Total hours spent: 4h 30m
- Technical Debt management:
  - Total hours estimated: 6h
  - Total hours spent: 7h 30m
  - Hours estimated for remediation by SonarQube: 3h 30m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 1h
  - Hours spent on remediation: 1h 30m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 6.2%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): A, A, A

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Unexpected roadblock with Docker, which was a new technology for all of us.
  - Internal misunderstandig regarding implementation of one feature between frontend/backend teams.

- What lessons did you learn (both positive and negative) in this sprint?

  - We need to find balance between productivity and testing.
  - We did an even better job at splitting task.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - Keep better track of estimated/spent time
  - Improve task splitting

- Which ones you were not able to achieve? Why?

  - /

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - Keep documentation updated and check it regularly
  - Now that the UI is more stable, get back to testing it more

### What we are proud of

- We are proud of how much we managed to achieve during this sprint
- We improved at new technologies like Git and Docker.
