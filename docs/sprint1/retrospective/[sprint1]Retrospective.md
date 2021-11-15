# TEMPLATE FOR RETROSPECTIVE (Team P04)

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- 2 stories committed vs 2 stories done
- 18 points committed vs 18 done
- 76 hours estimated vs 110 spent (as a team) \*

\* The difference is due to a misunderstanding of YouTrack estimation report

Our Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 15      | -      | 47         | 67           |
| 1     | 11      | 13     | 26         | 35           |
| 2     | 4       | 5      | 6h 30m     | 7h 30m       |

- Hours per task (average, standard deviation): 3.6h avg per task, ~3h standard deviation
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table: 79/110 = 0.72

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: //
  - Total hours spent: 6h 40m
  - Nr of automated unit test cases: 20 (27 with integration)
  - Coverage (if available): 88%
- E2E testing:
  - Total hours estimated: //
  - Total hours spent: 3h
- Code review
  - Total hours estimated: //
  - Total hours spent: 5h 25m
- Technical Debt management:
  - Total hours estimated: //
  - Total hours spent: 2h 30m
  - Hours estimated for remediation by SonarQube: 1h 30m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 1h 30m
  - Hours spent on remediation: 2h 30m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.1%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): A, A, A

## ASSESSMENT

- What caused your errors in estimation (if any)? We used a Timesheet report to track total estimation hours, but our misunderstading on how Youtrack counted those hours led us off track.

- What lessons did you learn (both positive and negative) in this sprint?

  - Don't rely solely on Youtrack to keep track of development.
  - Tasks need to splitted in even smaller sub-tasks.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - (Partially) Keep better track of estimated/spent time
  - (Partially) Improve task splitting
  - We held more SCRUM meetings and improved team synchronization and communication

- Which ones you were not able to achieve? Why?

  - Some errors with estimation, due to previously noted Youtrack misunderstandings
  - We're getting better at splitting tasks, but there is still some work to do

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - Improve tracking, as we said before, even outside of Youtrack
  - Improve task splitting, thanks to the experience we are gaining

### What we are proud of

- We did everything as we planned initially to do, respecting all the constraints (e.g. the work hours limit)
- Team communications despite our difficult team schedule
