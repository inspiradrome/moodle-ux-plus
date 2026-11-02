# Moodle UX+

**Your Moodle. Your shortcuts. Built with AI.**

Moodle UX+ is an open, AI-assisted *recipe* for building small browser enhancements tailored to a particular Moodle installation. It is **not** a universal Moodle plugin or a promise that one userscript will work on every site.

Moodle's everyday administrative workflows can involve repetitive navigation. A human administrator who understands their work, collaborating with an AI coding assistant, can often create a modest local improvement without changing Moodle's server code.

## What inspired this project

A working local prototype demonstrated two floating shortcuts:

- **Quick User Lookup:** paste a name or email, choose a field or let **Auto** infer Email versus Full name, then navigate to Moodle's user search and apply the appropriate filters. A small hint shows the selected target field.
- **Quick Course Search:** find a course by name or numeric ID. An optional locally cached course index supports fast name matching and a manually initiated refresh.

These features were tested in **one** Moodle environment. Other installations can differ in markup, permissions, authentication, themes, and available reports. Treat the design as reusable, not the selectors.

## Start here

1. Read [Safety and privacy](docs/SAFETY.md) before inspecting your Moodle site.
2. Copy [BUILD_WITH_AI.md](BUILD_WITH_AI.md) into your preferred AI coding assistant, and work through its discovery questions together.
3. Use [REFERENCE.md](REFERENCE.md) to understand the prototype's architecture and trade-offs.
4. See [examples/README.md](examples/README.md) for safe, generic starter examples.
5. Test with non-sensitive sample inputs and limited permissions; keep an easy rollback path.

You need a browser with userscript support (for example, a compatible userscript manager), permission to use it in your environment, and sufficient Moodle access for the actions you want to streamline. **Administrator privileges are not automatically required for every feature**, but they are required for some administrative workflows.

## Guiding principles

- **Human-led:** the administrator identifies real friction and approves the behaviour.
- **AI-assisted:** the assistant helps discover page structure, design, write, review, and test code.
- **Local-first:** prefer browser-side interactions and existing authenticated pages; avoid external services.
- **Least privilege:** use only the permissions and data needed for the feature.
- **Inspectable:** no hidden data collection, telemetry, or background polling by default.
- **Adaptable:** keep institution-specific selectors, URLs, and assumptions out of the shared recipe.
- **Reversible:** userscripts can be disabled without altering Moodle server code.

## What this repository does *not* contain

- No institution-specific domains, account details, course lists, or personal records.
- No credentials, session tokens, database exports, or captured network responses.
- No turnkey userscript advertised as compatible with all Moodle installations.
- No instructions to bypass access controls or institutional policies.

## How to contribute

Contribute **problems, workflows, discovery methods, prompts, and tested design patterns**. A recipe that works across several environments is especially valuable. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Possible directions

Ideas include keyboard-first navigation, configurable shortcuts, contextual links, accessible search panels, course/user favourites, lightweight admin dashboards, enrolment workflow helpers, and more. These are **possibilities, not a roadmap**: the needs and imagination of each human–AI team should determine what gets built. See [docs/FUTURE_IDEAS.md](docs/FUTURE_IDEAS.md).

## Licence

MIT License for the original materials in this repository. See [LICENSE](LICENSE). Moodle and other product names belong to their respective owners. This project is independent and not endorsed by Moodle HQ.
