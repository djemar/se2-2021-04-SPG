# RETROSPECTIVE SPRINT 3 (Team P04)

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- 3 stories committed vs 3 stories done
- 32 points committed vs 32 done
- 113 hours estimated vs 114 spent (as a team)

Our Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 15      | -      | 43h 30m    | 43h          |
| 9     | 16      | 21     | 29h 30m    | 31h 20m      |
| 10    | 2       | 8      | 4h 30m     | 4h 30m       |
| 11    | 2       | 3      | 3h 30m     | 3h 15m       |

- Hours per task (average, standard deviation): 2.3h avg per task, ~ 1h 30m standard deviation
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table: 81/82 = 0.98

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 20h
  - Total hours spent: 24h
  - Nr of automated unit test cases: 46 + 94 = 140
  - Coverage (if available): 74.9%
- E2E testing:
  - Total hours estimated: 4h 30m
  - Total hours spent: 4h
- Code review
  - Total hours estimated: 1h 40m
  - Total hours spent: 1h 35m
- Technical Debt management:
  - Total hours estimated: 7h + 32h = 39h
  - Total hours spent: 5h 30m + 32h = 37h 30m
  - Hours estimated for remediation by SonarQube: 8h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 30m
  - Hours spent on remediation: 15m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.1%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): A, A, A

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Unexpected trouble
  - We under-estimated the tecnical debt

- What lessons did you learn (both positive and negative) in this sprint?

  - We need to have the final version of the code a bit earlier

- Which improvement goals set in the previous retrospective were you able to achieve?

  - Documentation have been updated

- Which ones you were not able to achieve? Why?

  - Do more test because coverage is not at 80% yet

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Improve team communication about the tasks on-going
  - Do more team's meeting

### What we are proud of

- We commited all the story
- We improve with YouTrack
