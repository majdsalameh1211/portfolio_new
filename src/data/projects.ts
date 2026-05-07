export type Problem = {
  title: string
  problem: string
  solution: string
}

export type Project = {
  slug: string
  title: string
  subtitle?: string
  type: 'freelance' | 'personal'
  status: 'live' | 'complete' | 'in-progress'
  stack: string[]
  shortDesc: string
  // Full page fields
  descriptionHeadline: string
  descriptionBullets: string[]
  descriptionImpact: string
  whatItDoes: string[]
  problems: Problem[]
  built: string[]
  decisions: { q: string; a: string }[]
  architectureUrl?: string
  demoUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'real-estate-enterprise',
    title: 'Enterprise CRM & Lead Management',
    subtitle: 'Real Estate Agency — Full-stack system',
    type: 'freelance',
    status: 'live',
    stack: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'React', 'TanStack Query', 'JWT', 'Docker', 'Railway'],
    shortDesc: 'Full-stack enterprise system replacing Zoho with a custom Meta webhook pipeline. Used daily by ~10 users across sales, management, and admin roles.',

    descriptionHeadline: '4 interconnected applications. 1 backend. Used by an entire company, every day.',
    descriptionBullets: [
      'Public-facing real estate website',
      'Content management system for website data',
      'Real-time CRM for the sales team',
      'Admin dashboard for lead management & team monitoring',
    ],
    descriptionImpact: 'Built as a fully custom solution — replacing Zoho and third-party subscriptions, cutting monthly tooling costs by 95%',

    whatItDoes: [
      'Captures leads automatically from Facebook & Instagram ads and the website contact form',
      'Gives the sales team a real-time dashboard to manage, track, and log every lead',
      'Lets admins manage all website content with full multilingual support — Arabic, Hebrew, and English',
      'Gives superadmins full visibility over the team — assignments, activity, and performance',
    ],

    problems: [
      {
        title: 'Manual lead entry & third-party dependency',
        problem: 'Leads from Facebook ads were copied manually into Zoho — delayed, duplicated, and costly.',
        solution: 'Custom Meta webhook pipeline — webhook → Graph API fetch → normalize → deduplicate → persist → real-time notify. Zoho eliminated. Manual entry eliminated.',
      },
      {
        title: '10 simultaneous users causing data conflicts',
        problem: 'Multiple agents updating the same leads created race conditions and stale data.',
        solution: 'Three-layer Socket.IO room architecture — every update broadcasts instantly to the right users only. TanStack Query cache mutated surgically on socket events, no full refetch.',
      },
      {
        title: 'Independent unread tracking per agent',
        problem: 'Each agent needed their own unread counter per lead, not a shared flag.',
        solution: 'MongoDB Map field on Lead — one counter per agent ID, atomically reset on open, badge cleared instantly via socket event.',
      },
      {
        title: 'Session security across tabs and devices',
        problem: 'Suspended accounts stayed logged in until JWT expiry — sometimes hours.',
        solution: 'JWT token versioning + force_logout socket event + BroadcastChannel AuthSyncManager — invalidation is instant across every tab and device.',
      },
      {
        title: 'Bulk operations beyond what\'s loaded on screen',
        problem: 'Managers needed to operate on thousands of filtered leads, not just the visible page.',
        solution: 'Dual-mode bulk system — selected IDs or selectAll mode that re-executes the server-side filter query on the full dataset.',
      },
    ],

    built: [
      'Meta webhook pipeline — webhook verification → Graph API fetch → field normalization → duplicate detection → CRM ingestion → real-time Socket.IO notification',
      'Real-time multi-user lead pipeline with instant assignment, per-admin unread tracking (MongoDB Map field), and surgical TanStack Query cache mutation on socket events',
      'RBAC with JWT tokenVersion kill switch — incrementing tokenVersion invalidates all existing sessions instantly without a blacklist',
      'BroadcastChannel AuthSyncManager — cross-tab session coordination with localStorage fallback and 200ms cookie watcher',
      'Three Socket.IO room types: superadmin room, personal admin_{id} rooms, and access-controlled lead_{id} rooms joined on demand',
    ],

    decisions: [
      {
        q: 'Why tokenVersion instead of a token blacklist?',
        a: 'A blacklist requires a DB lookup on every request and grows unboundedly. tokenVersion is a single integer on the Admin document — incrementing it invalidates all sessions at the next request check. Same security guarantee, O(1) lookup, zero storage growth.',
      },
      {
        q: 'Why surgical cache mutation instead of refetch on socket events?',
        a: 'A full refetch re-fetches the entire paginated list, loses scroll position, and flashes the UI. In-place mutation updates only the specific record — zero network, instant, invisible to the user.',
      },
      {
        q: 'Why three Socket.IO room types?',
        a: 'Superadmin room broadcasts system-wide events to all superadmins at once. Personal rooms route events to exactly one user. Lead rooms scope activity updates to whoever has that lead open, with access control enforced at join time.',
      },
    ],

    architectureUrl: '#',
    demoUrl: '#',
  },

  {
    slug: 'booking-platform',
    title: 'Real-Time Booking Platform',
    subtitle: 'Service businesses — Live in production',
    type: 'freelance',
    status: 'live',
    stack: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'React', 'JWT', 'Supabase', 'Docker', 'Railway', 'Vercel'],
    shortDesc: 'Concurrency-safe booking system with 3-layer race condition protection — Socket.IO slot locking, server-side availability engine, and DB-level conflict detection.',

    descriptionHeadline: '2 applications. 1 backend. Solving real concurrency for real businesses.',
    descriptionBullets: [
      'Public-facing booking interface for customers',
      'Owner dashboard for managing services, schedules, and constraints',
      'Real-time slot locking across all concurrent users',
      'Appointment lifecycle with real-time status updates to owner and customer',
    ],
    descriptionImpact: 'Replaced manual scheduling and third-party booking tools — reducing operational overhead to infrastructure-only costs',

    whatItDoes: [
      'Lets customers browse available slots and book appointments in real time',
      'Gives business owners full control over services, working hours, breaks, and special days off',
      'Eliminates double-booking race conditions across concurrent users via 3-layer concurrency protection',
      'Tracks client history, no-shows, and suspensions across all bookings',
    ],

    problems: [
      {
        title: 'Double-booking race conditions',
        problem: 'Two users could see the same slot as available simultaneously and both submit a booking — standard DB conflict detection catches this too late, after the UX is already broken.',
        solution: '3-layer concurrency protection — Socket.IO slot lock the moment a user selects (UX layer), server-side availability re-check on every request (data layer), DB-level conflict detection as final safety net (DB layer). Each layer handles a different failure mode.',
      },
      {
        title: 'Slots staying locked after a user abandons',
        problem: 'A user selects a slot then closes their tab, crashes their browser, or loses connection. The slot stays locked indefinitely — blocking everyone else from booking it.',
        solution: 'Locks release on disconnect via releaseAllSessionLocks(socketId) — broadcasting slot:unlocked instantly to all clients. A 5-minute TTL with a 60-second cleanup interval handles silent abandonment where no disconnect event fires. The system heals itself.',
      },
      {
        title: 'Complex availability with multiple constraint layers',
        problem: 'Slots had to account for working hours, break times, special days off, daily schedule overrides, existing appointments, live locks, and timezone-aware "now" — all simultaneously.',
        solution: 'All constraint resolution runs entirely server-side in a single availability engine. The client receives only clean, bookable slots — no constraint logic leaks to the frontend. Timezone-aware with a 30-minute lead-time buffer for same-day bookings.',
      },
      {
        title: 'Same client, different phone formats',
        problem: 'The same customer could book with +972504567890 or 0504567890 — treated as two different clients, breaking no-show tracking and suspension enforcement.',
        solution: 'Phone normalization on every record — strips formatting, converts Israeli country codes. The same person always resolves to the same client record regardless of format used.',
      },
    ],

    built: [
      'Socket.IO slot-locking mechanism — locks a time slot the moment a user begins booking, with automatic cleanup on disconnect, preventing double-booking race conditions',
      'Multi-layer availability engine — timezone-aware, break-aware, override-aware slot generation running entirely server-side',
      'Client suspension system with phone normalization — strips formatting and converts Israeli country codes so the same number in different formats resolves to the same client record',
      'JWT authentication with global Axios interceptors handling 401 interception and session cleanup across three independent frontend applications',
    ],

    decisions: [
      {
        q: 'Why in-memory slot locking instead of DB-level locking?',
        a: 'DB-level conflict detection catches races after the fact — the UX is already broken. An in-memory Map keyed by slot locks it the instant the user begins booking and broadcasts to all clients immediately. Redis is the declared upgrade path for distributed deployments.',
      },
      {
        q: 'Why embed client/service data at write time?',
        a: 'Embedding makes appointment records self-contained — reading history never requires populating refs, and service/client changes don\'t retroactively alter historical records.',
      },
    ],

    architectureUrl: '#',
    demoUrl: '#',
  },

  {
    slug: 'excel-etl',
    title: 'Excel Data Pipeline (ETL)',
    subtitle: 'Medical data engineer — Delivered',
    type: 'freelance',
    status: 'complete',
    stack: ['Python', 'pandas', 'NumPy', 'dataclasses'],
    shortDesc: 'Config-driven ETL pipeline converting a checkbox-encoded clinical Excel dataset into fully typed Python objects with 100% independent validation coverage.',

    descriptionHeadline: 'Clinical data. Non-standard encoding. Zero tolerance for errors.',
    descriptionBullets: [
      'Reverse-engineered checkbox encoding rules from the Excel schema',
      'Three-level object hierarchy — Patient → Foot → Region',
      'Config-driven architecture — schema changes touch one file, not the code',
      'Independent validation layer that re-reads and re-applies every transform from scratch',
    ],
    descriptionImpact: 'Delivered to a medical data engineer as the ingestion foundation for downstream inference models — guaranteeing 100% field-level correctness across the full patient hierarchy',

    whatItDoes: [
      'Reads a clinical Excel dataset where most fields are checkbox-encoded across two columns',
      'Transforms raw data into fully typed Python dataclass objects mirroring the study hierarchy',
      'Validates every field independently by re-reading raw source and re-applying every transform from scratch',
      'Writes per-patient JSON output with detailed processing and validation logs — PASS/FAIL/WARNING per field',
    ],

    problems: [
      {
        title: 'Non-standard checkbox encoding with invalid states',
        problem: 'Fields were not simple values — each was split across two columns with meaning determined by which combination was checked. Three different encoding patterns existed across vascular, neurological, and region fields. Double-check and double-uncheck were both invalid states that had to be detected and flagged.',
        solution: 'Three dedicated resolver functions — resolve_vascular_pair, resolve_neuro_pair, resolve_region_pair — each handling all four checkbox combinations including invalid states with explicit warnings. Config maps which resolver applies to which field, making it trivial to add new field types without touching existing code.',
      },
      {
        title: 'Schema changes breaking the pipeline',
        problem: 'Excel column names could change at any time — and the left/right foot columns already used different naming conventions. The left foot even had a typo in one column name. Hardcoding column names in transform logic would mean code changes on every schema update.',
        solution: 'Config-driven column mapping — all Excel column → field mappings live in plain Python dicts in config files. The build and validation layers never reference Excel column names directly. Schema changes touch one file, not the code. Typos and naming inconsistencies are handled silently via separate col maps.',
      },
      {
        title: '100% validation coverage on sensitive clinical data',
        problem: 'Clinical data errors are unacceptable. Validating the build output only catches serialization bugs — not encoding bugs, mapping bugs, or transform bugs that the build path could silently get wrong.',
        solution: 'Completely independent validation layer — re-reads raw Excel, re-applies every transform from scratch, then compares against stored values. Three validation types: simple (single column + optional range/format check), treatment (ndarray element-by-element comparison), range-only (for free-text fields). NaN==NaN trap handled explicitly.',
      },
      {
        title: 'Pipeline crash losing all processed data',
        problem: 'Processing dozens of patients sequentially means a crash halfway through loses all completed work — forcing a full re-run from scratch.',
        solution: 'try/finally guarantees all_patients_by_study.json and all_patients_by_id.json are always written even on crash — preserving whatever was successfully processed. Three error categories tracked separately: missing data, crash, and validation warnings. Each patient\'s validation report is saved independently before the next patient is processed.',
      },
    ],

    built: [
      'Three-level @dataclass hierarchy (Patient → Foot → Region) with stable field names fully decoupled from Excel column names via config hashmaps',
      'Three distinct checkbox encoding resolvers (vascular, neurological, region observations) — each with double-check and double-uncheck detection with warnings',
      'Independent validation layer that re-reads raw Excel and re-applies every transform from scratch, then compares against stored values — 100% field coverage',
      'Resilient pipeline with try/finally guaranteeing partial output is always written even on crash; three error categories tracked separately',
    ],

    decisions: [
      {
        q: 'Why config-driven column mapping?',
        a: 'The Excel schema could change at any time. All column → field mappings live in plain Python dicts in config files — the build and validation layers never reference Excel column names directly. Schema changes touch one file, not the code.',
      },
      {
        q: 'Why a completely independent validation layer?',
        a: 'Validating the build output would only catch serialization bugs. Re-reading raw Excel and re-applying transforms independently catches encoding bugs, mapping bugs, and transform bugs — all categories the build path could silently get wrong.',
      },
    ],

    demoUrl: undefined,
    architectureUrl: undefined,
  },

  {
    slug: 'edr-orchestrator',
    title: 'Event-Driven Microservices Orchestrator',
    subtitle: 'Self-hosted job orchestration engine — alternative to Celery, BullMQ, AWS Batch',
    type: 'personal',
    status: 'complete',
    stack: ['Node.js', 'TypeScript', 'Docker', 'WebSockets', 'Express', 'React'],
    shortDesc: 'A production-grade job orchestration engine built from scratch — process isolation, durable queue, pre-flight validation, real-time observability, and full container lifecycle control. Zero external dependencies beyond Docker.',

    descriptionHeadline: 'Built what AWS Batch, Celery, and BullMQ do. From scratch. Zero external dependencies.',
    descriptionBullets: [
      'Submit a job via HTTP — validates, queues, isolates, executes, and persists results automatically',
      'fork()-based process isolation — one OS process per job, crashes are fully contained',
      'File-backed durable queue — survives process restarts with the same guarantee as Redis',
      'Full container lifecycle control — pause, resume, kill, monitor, stream artifacts in real time',
    ],
    descriptionImpact: 'Being integrated as the orchestration backbone for a live algorithmic trading infrastructure — Redis pub/sub and AWS SQS as the declared next integration step',

    whatItDoes: [
      'Accepts job submissions via HTTP and runs a 4-check pre-flight validation before the queue is ever touched',
      'Spawns one isolated OS process per job via fork() — a crash, timeout, or memory leak is fully contained',
      'Streams every lifecycle event in real time — job:received → job:running → job:progress → job:output → job:completed',
      'Monitors live CPU/RAM per running container, tracks peak usage, persists output artifacts from container volumes',
      'Pause, resume, or kill any running container by name — bidirectional awareness, not fire-and-forget',
      'System-wide observability — live resource gauges, per-service success rates, full paginated job history',
    ],

    problems: [
      {
        title: 'A crashing job taking down the entire system',
        problem: 'Async functions and threads share memory — a crash, timeout, or memory leak in one job corrupts shared state and can bring down the manager and all other running jobs.',
        solution: 'fork()-based worker pool — each job is a separate OS process with its own memory space. IPC via process.send() for clean lifecycle communication. A crash is fully isolated. The manager and all other workers continue unaffected.',
      },
      {
        title: 'Queue losing all pending jobs on restart',
        problem: 'In-memory queues lose everything on process restart — unacceptable when jobs are queued for delayed or scheduled execution.',
        solution: 'File-backed durable queue (queue.json + jobs.json) as the source of truth. Kill the process, restart it — every queued job is still there. Same durability guarantee as Redis, zero external dependency.',
      },
      {
        title: 'Invalid jobs polluting the system',
        problem: 'Jobs submitted with missing Docker images, invalid payloads, or insufficient resources enter the queue, consume a worker slot, and fail — creating noise and wasting capacity.',
        solution: '4-check pre-flight validator runs before the queue is touched: YAML config → Docker image availability (auto-pull if missing) → payload schema against expects[] → live resource budget. BLOCKED verdict rejects at the API layer. The queue stays clean.',
      },
      {
        title: 'No visibility into running containers',
        problem: 'Fire-and-forget Docker execution gives zero insight into progress, resource consumption, or the ability to intervene on a runaway job.',
        solution: 'Named containers enable full bidirectional awareness — docker stats polled every 2 seconds for peak CPU/RAM, progress.json streamed mid-execution as job:progress WebSocket events, pause/resume/kill available on any running container by name.',
      },
      {
        title: 'Adding new services requiring code changes',
        problem: 'Every new service type requiring orchestrator code changes tightly couples the engine to what it runs — making the system brittle and hard to extend.',
        solution: 'YAML service contracts — each service declares its image, timeout, resources, and expected payload in a .yaml file. The expects[] field is the declared interface, enforced at submission time. Drop a YAML file — the service is immediately available. Zero code changes.',
      },
      {
        title: 'Concurrent state mutations producing inconsistent job records',
        problem: 'Multiple layers of the system writing to job state simultaneously — API, worker, monitor, WebSocket broadcaster — can produce inconsistent records with no clear ownership.',
        solution: 'Per-field write ownership enforced across the Event model — each field is only writable by one designated layer. Status transitions follow a strict FSM: queued → running → paused → completed/failed/killed. No field is written outside its lifecycle phase.',
      },
      {
        title: 'No system-wide observability',
        problem: 'Per-job visibility is not enough — you need to know the health of the entire system: resource utilization, service reliability over time, and historical job data.',
        solution: 'SystemMonitor broadcasts live CPU/memory/disk every 5 seconds via WebSocket. Per-service aggregates computed on demand — total runs, success rate, average duration, last status. Three-page React dashboard: live feed with inline progress bars, job submission with READY/WARNING verdict before submit, paginated history with artifact viewer.',
      },
    ],

    built: [
      'fork()-based worker pool — one OS process per job, IPC via process.send(). Crashes are fully isolated from the manager and other workers',
      'File-backed durable queue (queue.json + jobs.json) — survives process restarts with zero external dependencies',
      '4-check pre-flight validator (YAML → Docker image → payload → resources) — BLOCKED verdict rejects at the API layer before the queue is touched',
      'Strict lifecycle FSM with per-field write ownership — each field writable only by its designated system layer, no ambiguous state mutations',
      'Real-time WebSocket broadcasting — every lifecycle event streamed to the React dashboard with live CPU/RAM per container and mid-execution progress streaming',
      'Full container lifecycle control — named containers, pause/resume/kill, peak resource tracking, artifact persistence from output volumes',
      'System-wide observability — live resource gauges, per-service success rate aggregates, paginated job history with artifact viewer',
    ],

    decisions: [
      {
        q: 'Why fork() instead of async/threads?',
        a: 'Each worker is a separate OS process with its own memory space. A container timeout or crash cannot corrupt the manager state. This is the same isolation guarantee production orchestrators like Celery use — implemented from scratch.',
      },
      {
        q: 'Why file-backed queue instead of Redis?',
        a: 'Files mean zero dependencies and full restartability — the queue survives process restarts. This is a deliberate scope decision, not a naïve one. Redis pub/sub is the declared V2 integration step already designed for.',
      },
      {
        q: 'Why YAML service contracts?',
        a: 'The expects[] field is the service\'s declared interface, enforced by the validator at submission time. Adding a new service requires zero orchestrator code changes — drop a YAML file and it\'s immediately available. The engine knows nothing about the service internals.',
      },
      {
        q: 'Why a validator as a gate, not a warning?',
        a: 'Logging issues and letting jobs through creates noise — failed jobs in the store, wasted worker slots, confusing logs. Hard failures block at the API layer before they touch the queue. The system stays clean by design.',
      },
      {
        q: 'Why per-field write ownership?',
        a: 'When multiple system layers can write to the same record, you get race conditions and inconsistent state that are nearly impossible to debug. Ownership rules make state transitions deterministic — each field has exactly one writer, and that writer is bound to a specific lifecycle phase.',
      },
    ],

    githubUrl: '#',
  },

{
    slug: 'visospeak',
    title: 'VisoSpeak — Lip Reading Research',
    subtitle: 'Final Degree Project · Braude College of Engineering',
    type: 'personal',
    status: 'complete',
    stack: ['Python', 'PyTorch', 'TensorFlow', 'GCP', 'MediaPipe', 'OpenCV', 'Flask', 'React'],
    shortDesc: 'Visual speech recognition system reconstructing sentences from silent lip movement video. The real engineering challenge: building a cloud data pipeline to train on 2TB+ of video data at near-zero cost with continuous GPU utilization.',

    descriptionHeadline: '2TB of training data. Near-zero cost. GPU running continuously. Built from scratch.',
    descriptionBullets: [
      'Visual-only speech recognition — reconstructs spoken sentences from lip movements, no audio',
      'Cloud streaming pipeline — 2TB+ dataset streamed from GCP to GPU, no full download',
      '3x storage compression — 1.2TB reduced to 400GB via batch packing strategy',
      'Custom Transformer architecture with proposed boundary token research contribution',
    ],
    descriptionImpact: 'Final degree project at Braude College of Engineering — cloud pipeline, RAM buffer strategy, and Transformer model built independently',

    whatItDoes: [
      'Streams 2TB+ of training data from Google Drive to Colab GPU without downloading the full dataset',
      'Maintains a RAM buffer ensuring the GPU always has the next batch ready — zero idle time between batches',
      'Trains a Transformer model with a 3D-CNN visual frontend on 80,000+ video clips from the LRS2 dataset',
      'Proposes <sow>/<eow> boundary tokens for explicit word boundary supervision during training',
      'Serves predictions via Flask API with a React frontend for video clip selection and model comparison',
    ],

    problems: [
      {
        title: 'GPU sitting idle waiting for data between every batch',
        problem: 'Reading thousands of individual .pt tensor files from Google Drive over a network connection causes the GPU to stall at every batch boundary waiting for I/O — destroying training throughput on an already time-limited Colab session.',
        solution: 'RAM buffer preload strategy — a buffer of preprocessed batches (~50GB) is maintained in Colab RAM ahead of training. The GPU always has the next batch ready before it finishes the current one. Combined with sequential .npz streaming from Drive, the GPU runs continuously with zero I/O idle time.',
      },
      {
        title: '1.2TB dataset exceeding practical storage limits',
        problem: 'Raw preprocessed tensors at 1.2TB exceed practical Google Drive storage limits for a cost-constrained academic environment — making the dataset impossible to store and impractical to stream.',
        solution: 'Batch compression strategy — 32 preprocessed videos packed into a single .npz file instead of one .pt file per video. Storage reduced from 1.2TB to ~400GB (3x reduction). File count reduced by 32x — enabling sequential streaming and making the dataset practically trainable on a free/low-cost Colab environment.',
      },
      {
        title: 'Training progress lost when Colab sessions time out',
        problem: 'Colab sessions time out and disconnect without warning — any training progress not explicitly saved is lost entirely, forcing a full restart from epoch 0.',
        solution: 'Checkpoint saving to Drive after every epoch (epoch_X.pt). Any session timeout resumes from the last saved checkpoint. Mixed precision training used to reduce GPU memory pressure and increase effective batch size, reducing the number of epochs needed.',
      },
      {
        title: 'Word boundary detection relying on heuristic post-processing',
        problem: 'LipNet uses CTC loss with character-level output — word boundaries are not learned during training but inferred by heuristic post-processing afterward. This limits sentence segmentation accuracy.',
        solution: 'Proposed <sow>/<eow> boundary tokens added to the viseme vocabulary — start-of-word and end-of-word markers that allow the Transformer to explicitly learn word boundary positions during training. Direct supervision replaces heuristic inference.',
      },
      {
        title: 'Face detection too slow for 80,000+ video clips',
        problem: 'Dlib face detection at ~6 FPS on 68 landmarks was too slow to preprocess 80,000+ video clips at 25 FPS within practical time constraints.',
        solution: 'MediaPipe Face Mesh — 468 landmarks at ~18-20 FPS, 3x faster than Dlib with better robustness on varied lighting and angles. Chosen after benchmarking both on the preprocessing workload.',
      },
    ],

    built: [
      '3x storage compression — 32 videos packed per .npz batch, reducing dataset from ~1.2TB to ~400GB, enabling training on a cost-constrained environment',
      'GCP streaming pipeline — sequential batch streaming from Google Drive to Colab RAM buffer to GPU, eliminating I/O-bound idle time',
      'RAM buffer preload strategy — next batch always ready in RAM before GPU finishes current batch, continuous GPU utilization',
      'Transformer architecture with proposed <sow>/<eow> boundary tokens for explicit word boundary supervision',
      'Checkpoint saving after every epoch — training survives Colab session timeouts with zero progress loss',
      'MediaPipe Face Mesh preprocessing (468 landmarks, ~18-20 FPS) — 3x faster than Dlib on 80,000+ video clips',
    ],

    decisions: [
      {
        q: 'Why batch-compress into .npz instead of individual .pt tensors?',
        a: 'Reading thousands of individual files from Google Drive over a network connection causes the GPU to sit idle at every batch boundary. Batch compression reduces file count by 32x and enables sequential streaming — the GPU runs continuously. Storage reduction from 1.2TB to 400GB was a necessary side effect.',
      },
      {
        q: 'Why RAM buffer preloading instead of direct streaming?',
        a: 'Direct streaming means the GPU waits for Drive I/O at every batch boundary. A RAM buffer decouples data loading from GPU execution — the next batch is always ready. The buffer size (~50GB) was chosen to fit Colab RAM while maximizing lookahead.',
      },
      {
        q: 'Why boundary tokens over standard CTC decoding?',
        a: 'CTC relies on heuristic post-processing to infer word boundaries after the fact. Explicit <sow>/<eow> tokens allow the model to learn boundary positions during training — direct supervision rather than inference. This is the core research contribution of the project.',
      },
      {
        q: 'Why MediaPipe over Dlib for face detection?',
        a: 'Dlib at ~6 FPS on 68 landmarks was a preprocessing bottleneck on 80,000+ clips at 25 FPS. MediaPipe Face Mesh at ~18-20 FPS on 468 landmarks is 3x faster with better robustness on varied conditions. Benchmarked both before committing.',
      },
    ],

    githubUrl: '#',
  },
]

export const freelanceProjects = projects.filter(p => p.type === 'freelance')
export const personalProjects = projects.filter(p => p.type === 'personal')