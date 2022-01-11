# RETROSPECTIVE SPRINT 4 (Team P04)

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- 3 stories committed vs 3 stories done
- 39 points committed vs 39 done
- 117 hours estimated vs 122 hours spent (as a team)

Our Definition of Done:

- Unit Tests passing
- Sonar quality gate passed
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 15      | -      | 36h 00m    | 36h 35m      |
| 40    | 6       | 21     | 9h 30m     | 8h 45m       |
| 41    | 8       | 13     | 19h 30m    | 14h 35m      |
| 12    | 6       | 5      | 12h 30m    | 18h 00m      |

- Hours per task (average, standard deviation): 2.2h avg per task, ~ 1.78h standard deviation
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table: 77/78 = 0.99

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 18h
  - Total hours spent: 18h 20 m
  - Nr of automated unit test cases: 104 + 63 = 167
  - Coverage (if available): 78%
- E2E testing:
  - Total hours estimated: 5h
  - Total hours spent: 3 h 25m
- Code review
  - Total hours estimated: 15h
  - Total hours spent: 8h 20m
- Technical Debt management:
  - Total hours estimated: 43h 30m
  - Total hours spent: 44h 30m
  - Hours estimated for remediation by SonarQube: 8h 20m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 30m
  - Hours spent on remediation: 20m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.2%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): A, A, A

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Fixing broken tests
  - General flow check under estimated
  - Unexperience people sharing task

- What lessons did you learn (both positive and negative) in this sprint?

  - We learned that holding lots of meetings is crucial to the success of the sprint
  - Developing and refactoring new code while keeping all the test suites working is hard, testing needs a lot of time if you want to do it right

- Which improvement goals set in the previous retrospective were you able to achieve?

  - We did improve team communication and held more meetings

- Which ones you were not able to achieve? Why?

  - none

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Be more precise on the estimation on code review
  - Do more end-to-end testing

### What we are proud of

- We completed more story points then usual
- We kept a high coverage till the end
- We improved our team communication
