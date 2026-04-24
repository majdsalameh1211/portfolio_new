export type Project = {
  slug: string
  title: string
  subtitle?: string
  type: 'freelance' | 'personal'
  status: 'live' | 'complete' | 'in-progress'
  stack: string[]
  shortDesc: string
  overview: string
  built: string[]
  decisions: { q: string; a: string }[]
  architectureUrl: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'enterprise-crm',
    title: 'Enterprise CRM & Lead Management',
    subtitle: 'Real Estate Agency — Full-stack system',
    type: 'freelance',
    status: 'live',
    stack: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'React', 'TanStack Query', 'JWT', 'Docker', 'Railway'],
    shortDesc: 'Full-stack CRM replacing Zoho with a custom Meta webhook pipeline. Used daily by ~10 users across sales, management, and admin roles.',
    overview: 'A full-stack enterprise system built for a real estate agency — public website, content management system, and a real-time CRM with automated Meta webhook lead ingestion from Facebook and Instagram. Used in production by ~10 users 6 days a week, 8+ hours a day. Replaced the client\'s paid Zoho subscription, reducing monthly tooling costs by 95%.',
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
  },
  {
    slug: 'booking-platform',
    title: 'Real-Time Booking Platform',
    subtitle: 'Service businesses — Live in production',
    type: 'freelance',
    status: 'live',
    stack: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'React', 'JWT', 'Supabase', 'Docker', 'Railway'],
    shortDesc: 'Concurrency-safe booking system with Socket.IO slot-locking that eliminates double-booking across simultaneous users.',
    overview: 'A full-stack booking system for service businesses — public booking frontend and a separate admin dashboard for managing services, time slots, and scheduling constraints. Live in production across multiple businesses. The core engineering challenge was eliminating double-booking race conditions across concurrent users.',
    built: [
      'Socket.IO slot-locking mechanism — locks a time slot the moment a user begins booking, with automatic cleanup on disconnect, preventing double-booking race conditions',
      'Multi-layer availability engine — timezone-aware, break-aware, override-aware slot generation running entirely server-side across working hours, special days, existing appointments, and live locks',
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
  },
  {
    slug: 'excel-etl',
    title: 'Excel Data Pipeline (RMed ETL)',
    subtitle: 'Medical data engineer — Delivered',
    type: 'freelance',
    status: 'complete',
    stack: ['Python', 'pandas', 'NumPy', 'dataclasses'],
    shortDesc: 'Config-driven ETL pipeline converting a checkbox-encoded clinical Excel dataset into fully typed Python objects with 100% independent validation coverage.',
    overview: 'A Python ETL pipeline for a medical data engineer — converting a complex checkbox-encoded clinical study Excel dataset into fully typed, validated Python objects ready for downstream inference models. The deliverable: take the Excel schema, reverse-engineer the encoding rules, build OOP data classes mirroring the hierarchy, and guarantee 100% validation coverage.',
    built: [
      'Three-level @dataclass hierarchy (Patient → Foot → Region) with stable field names fully decoupled from Excel column names via config hashmaps',
      'Three distinct checkbox encoding resolvers (vascular, neurological, region observations) — each with double-check and double-uncheck detection with warnings',
      'Independent validation layer that re-reads raw Excel and re-applies every transform from scratch, then compares against stored values — 100% field coverage',
      'Resilient pipeline with try/finally guaranteeing partial output is always written even on crash; three error categories (missing data / crash / warnings) tracked separately',
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
    architectureUrl: '#',
  },
  {
    slug: 'edr-orchestrator',
    title: 'Event-Driven Microservices Orchestrator',
    subtitle: 'Self-hosted job orchestration engine',
    type: 'personal',
    status: 'complete',
    stack: ['Node.js', 'TypeScript', 'Docker', 'WebSocket', 'Express', 'React'],
    shortDesc: 'A self-hosted job orchestration engine built from scratch — YAML-defined services, fork()-based process isolation, file-backed durable queue, and real-time WebSocket telemetry.',
    overview: 'A lightweight, self-hosted alternative to Celery, BullMQ, or AWS Batch — built from scratch to demonstrate event-driven architecture, process isolation, and real-time observability without external dependencies beyond Docker. Currently being integrated as the orchestration backbone for a live algorithmic trading infrastructure.',
    built: [
      'fork()-based worker pool — one OS process per job, IPC via process.send(). A crashing job cannot corrupt the manager state or affect other workers',
      'File-backed durable queue (queue.json + jobs.json) — kill the process, restart it, queued jobs are still there. Same durability guarantee as Redis, zero dependencies',
      '4-check pre-flight validator (YAML → Docker image → payload → resources) — BLOCKED verdict rejects jobs at the API layer before they touch the queue',
      'Real-time WebSocket lifecycle broadcasting — every state transition streamed to the React dashboard with live CPU/RAM tracking per container',
      'Named container lifecycle control — pause, resume, kill running containers by name; bidirectional awareness, not fire-and-forget',
    ],
    decisions: [
      {
        q: 'Why fork() instead of async/threads?',
        a: 'Each worker is a separate OS process with its own memory space. A container timeout or crash cannot corrupt the manager state. This is the same isolation guarantee that production orchestrators like Celery use.',
      },
      {
        q: 'Why file-backed queue instead of Redis for V1?',
        a: 'Files mean zero dependencies and full restartability — the queue survives process restarts. It\'s not naïve; it\'s a deliberate scope decision. Redis pub/sub is the declared V2 integration step.',
      },
      {
        q: 'Why YAML service contracts?',
        a: 'The expects[] field in the YAML is the service\'s declared interface. The validator enforces it at submission time. Adding a new service requires zero code changes — drop a YAML file and it\'s immediately available.',
      },
    ],
    architectureUrl: '#',
    githubUrl: '#',
  },
  {
    slug: 'visospeak',
    title: 'VisoSpeak — Lip Reading Research',
    subtitle: 'Final Degree Project · Braude College',
    type: 'personal',
    status: 'complete',
    stack: ['Python', 'PyTorch', 'TensorFlow', 'GCP', 'MediaPipe', 'OpenCV', 'Flask', 'React'],
    shortDesc: 'Visual speech recognition system reconstructing sentences from silent lip movement video — with a cloud streaming pipeline handling 2TB+ of training data.',
    overview: 'A visual-only speech recognition system that reconstructs spoken sentences from lip movements without any audio input. The research contribution is a proposed Transformer architecture with boundary tokens for improved word segmentation. Built independently: the cloud data pipeline, RAM buffer strategy, and Transformer model training — all on a cost-constrained GCP + Colab environment.',
    built: [
      '3x storage compression — 32 videos packed per .npz batch, reducing dataset from ~1.2TB to ~400GB, making training practical on Colab',
      'GCP streaming pipeline — batches stream from Google Drive to Colab RAM buffer to GPU continuously, eliminating I/O-bound GPU idle time between batches',
      'Transformer architecture with proposed <sow>/<eow> boundary tokens — explicit word boundary supervision for improved sentence segmentation over CTC-based LipNet baseline',
      'MediaPipe Face Mesh preprocessing (468 landmarks at ~18-20 FPS) over Dlib (68 landmarks at ~6 FPS) — chosen for speed and robustness on 80,000+ video clips',
    ],
    decisions: [
      {
        q: 'Why batch-compress into .npz files instead of individual .pt tensors?',
        a: 'Reading thousands of individual files from Google Drive over a network connection causes the GPU to sit idle waiting for I/O. Batch compression reduces file count by 32x and enables sequential streaming — the GPU runs continuously.',
      },
      {
        q: 'Why boundary tokens over standard CTC decoding?',
        a: 'CTC relies on heuristic post-processing to infer word boundaries. Explicit <sow>/<eow> tokens allow the model to learn boundary positions during training, providing direct supervision for sentence segmentation.',
      },
    ],
    architectureUrl: '#',
    githubUrl: '#',
  },
]

export const freelanceProjects = projects.filter(p => p.type === 'freelance')
export const personalProjects = projects.filter(p => p.type === 'personal')
