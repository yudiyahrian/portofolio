import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "flutter-clean-architecture-guide",
    title:
      "Flutter Clean Architecture: The Guide I Wish I Had When Starting Out",
    excerpt:
      "After implementing clean architecture across multiple production Flutter apps, here's the practical folder structure, patterns, and mistakes to avoid that nobody tells you about.",
    content: `
# Flutter Clean Architecture: The Guide I Wish I Had When Starting Out

Clean architecture in Flutter gets talked about a lot. Most articles show you the theory. This one shows you what it actually looks like in a production app.

## Why Clean Architecture?

After working on Flutter projects that started without a clear structure, I've seen the same problems appear every time:

- State leaks between screens because everything is in one place
- Impossible to test because business logic is tangled with widgets
- UI changes that break unrelated functionality
- Onboarding new developers takes days instead of hours

Clean architecture solves all of these. Here's how I implement it.

## The Folder Structure

\`\`\`
lib/
├── core/
│   ├── error/
│   │   ├── exceptions.dart
│   │   └── failures.dart
│   ├── network/
│   │   └── network_info.dart
│   └── usecases/
│       └── usecase.dart
├── features/
│   └── auth/
│       ├── data/
│       │   ├── datasources/
│       │   │   ├── auth_local_datasource.dart
│       │   │   └── auth_remote_datasource.dart
│       │   ├── models/
│       │   │   └── user_model.dart
│       │   └── repositories/
│       │       └── auth_repository_impl.dart
│       ├── domain/
│       │   ├── entities/
│       │   │   └── user.dart
│       │   ├── repositories/
│       │   │   └── auth_repository.dart
│       │   └── usecases/
│       │       ├── login_usecase.dart
│       │       └── logout_usecase.dart
│       └── presentation/
│           ├── bloc/
│           │   ├── auth_bloc.dart
│           │   ├── auth_event.dart
│           │   └── auth_state.dart
│           ├── pages/
│           │   └── login_page.dart
│           └── widgets/
│               └── login_form.dart
\`\`\`

The key rule: **dependencies only point inward**. Presentation depends on domain. Data depends on domain. Domain depends on nothing.

## The Domain Layer — The Heart

The domain layer is pure Dart — no Flutter, no packages. Just your business rules.

\`\`\`dart
// domain/entities/user.dart
class User {
  final String id;
  final String email;
  final String name;

  const User({
    required this.id,
    required this.email,
    required this.name,
  });
}
\`\`\`

\`\`\`dart
// domain/repositories/auth_repository.dart
abstract class AuthRepository {
  Future<Either<Failure, User>> login({
    required String email,
    required String password,
  });

  Future<Either<Failure, void>> logout();

  Future<Either<Failure, User>> getCurrentUser();
}
\`\`\`

\`\`\`dart
// domain/usecases/login_usecase.dart
class LoginUseCase implements UseCase<User, LoginParams> {
  final AuthRepository repository;

  LoginUseCase(this.repository);

  @override
  Future<Either<Failure, User>> call(LoginParams params) {
    return repository.login(
      email: params.email,
      password: params.password,
    );
  }
}

class LoginParams {
  final String email;
  final String password;

  const LoginParams({required this.email, required this.password});
}
\`\`\`

## The Data Layer

The data layer implements the domain contracts. It knows about HTTP, databases, and caches.

\`\`\`dart
// data/models/user_model.dart
class UserModel extends User {
  const UserModel({
    required super.id,
    required super.email,
    required super.name,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      email: json['email'] as String,
      name: json['name'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
    };
  }
}
\`\`\`

\`\`\`dart
// data/repositories/auth_repository_impl.dart
class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  AuthRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, User>> login({
    required String email,
    required String password,
  }) async {
    if (!await networkInfo.isConnected) {
      return Left(NetworkFailure());
    }

    try {
      final user = await remoteDataSource.login(
        email: email,
        password: password,
      );
      await localDataSource.cacheUser(user);
      return Right(user);
    } on ServerException catch (e) {
      return Left(ServerFailure(message: e.message));
    }
  }
}
\`\`\`

## The Presentation Layer — BLoC

I use flutter_bloc for state management. It keeps UI logic completely separate from business logic.

\`\`\`dart
// presentation/bloc/auth_bloc.dart
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final LoginUseCase loginUseCase;

  AuthBloc({required this.loginUseCase}) : super(AuthInitial()) {
    on<LoginRequested>(_onLoginRequested);
  }

  Future<void> _onLoginRequested(
    LoginRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());

    final result = await loginUseCase(
      LoginParams(email: event.email, password: event.password),
    );

    result.fold(
      (failure) => emit(AuthError(message: failure.message)),
      (user) => emit(AuthSuccess(user: user)),
    );
  }
}
\`\`\`

## The Biggest Mistake I Made

I used to put too much logic in use cases — things like input validation that belong in the presentation layer, or caching strategies that belong in the data layer.

**Rule of thumb**: Use cases should contain one and only one business rule. If your use case is getting long, split it.

## Dependency Injection with get_it

\`\`\`dart
// injection_container.dart
final sl = GetIt.instance;

Future<void> init() async {
  // BLoC
  sl.registerFactory(() => AuthBloc(loginUseCase: sl()));

  // Use Cases
  sl.registerLazySingleton(() => LoginUseCase(sl()));

  // Repository
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(
      remoteDataSource: sl(),
      localDataSource: sl(),
      networkInfo: sl(),
    ),
  );

  // Data sources
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(client: sl()),
  );

  // External
  sl.registerLazySingleton(() => http.Client());
}
\`\`\`

This setup takes a bit more upfront work, but every project I've maintained with clean architecture has been dramatically easier to extend and debug than the ones without it.
    `.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    author: "Yudiya Ahrian",
    publishedAt: "2025-03-10",
    readingTime: 11,
    tags: ["Flutter", "Dart", "Clean Architecture", "BLoC", "Mobile"],
    category: "deep-dive",
    featured: true,
    views: 3240,
  },
  {
    id: "2",
    slug: "nextjs-laravel-fullstack-setup",
    title: "My Go-To Next.js + Laravel Fullstack Setup in 2025",
    excerpt:
      "The exact project structure, API conventions, auth setup, and deployment workflow I use when starting every Next.js frontend with a Laravel backend — battle-tested across 3 production projects.",
    content: `
# My Go-To Next.js + Laravel Fullstack Setup in 2025

After using Next.js and Laravel together on three production projects — Quilla, Audify, and the Counseling Web App — I've settled on a setup that works really well. Here it is.

## Why Next.js + Laravel?

Laravel gives you the best DX for building REST APIs: elegant routing, Eloquent ORM, built-in auth, queues, and a massive ecosystem. Next.js gives you React Server Components, file-based routing, and Vercel deployment in one package.

Together they cover the full stack without compromise.

## Project Structure

\`\`\`
project/
├── frontend/          # Next.js app
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── api.ts     # Typed API client
│   │   └── types/
│   └── package.json
└── backend/           # Laravel API
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/Api/
    │   │   └── Resources/
    │   └── Models/
    ├── routes/
    │   └── api.php
    └── composer.json
\`\`\`

## Laravel API Setup

Start with a clean Laravel install and configure it as an API-only backend.

\`\`\`php
// routes/api.php
Route::prefix('v1')->group(function () {
    // Public routes
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);

        Route::apiResource('employees', EmployeeController::class);
        Route::apiResource('attendance', AttendanceController::class);
    });
});
\`\`\`

\`\`\`php
// app/Http/Controllers/Api/AuthController.php
class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }
}
\`\`\`

Always use API Resources to control your response shape:

\`\`\`php
// app/Http/Resources/UserResource.php
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
\`\`\`

## Next.js API Client

I build a typed API client that wraps fetch and handles auth tokens:

\`\`\`typescript
// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('auth_token')
    : null;

  const response = await fetch(\`\${API_BASE}\${endpoint}\`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.message ?? 'Request failed');
  }

  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      apiFetch<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => apiFetch<User>('/auth/me'),
    logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  },
  employees: {
    list: () => apiFetch<Employee[]>('/employees'),
    get: (id: string) => apiFetch<Employee>(\`/employees/\${id}\`),
    create: (data: CreateEmployeeData) =>
      apiFetch<Employee>('/employees', { method: 'POST', body: JSON.stringify(data) }),
  },
};
\`\`\`

## CORS Configuration

In Laravel's \`config/cors.php\`:

\`\`\`php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'https://yourapp.vercel.app',
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
\`\`\`

## Environment Variables

\`\`\`bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# backend/.env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
\`\`\`

This setup has served me well across multiple projects. The typed API client catches integration bugs at compile time rather than runtime, which alone saves hours of debugging.
    `.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    author: "Yudiya Ahrian",
    publishedAt: "2025-01-22",
    readingTime: 9,
    tags: ["Next.js", "Laravel", "TypeScript", "Fullstack", "API"],
    category: "tutorial",
    featured: true,
    views: 2180,
  },
  {
    id: "3",
    slug: "flutter-state-management-comparison",
    title: "BLoC vs Riverpod vs Provider: Which Should You Use in 2025?",
    excerpt:
      "I've shipped Flutter apps with all three. Here's an honest breakdown of when each state management solution shines and when it becomes a burden.",
    content: `
# BLoC vs Riverpod vs Provider: Which Should You Use in 2025?

After using all three across different projects, here's my honest take.

## Provider — Simple But Limited

Provider is the original Flutter state management solution. It's great for small apps and learning, but it struggles at scale.

\`\`\`dart
// Simple counter with Provider
class CounterProvider extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

// In your widget
Consumer<CounterProvider>(
  builder: (context, counter, child) => Text('\${counter.count}'),
)
\`\`\`

**Use Provider when**: Building a simple app or prototype, or you're just learning Flutter state management.

**Avoid Provider when**: You need testable business logic, complex state dependencies, or async state handling.

## BLoC — Verbose But Powerful

BLoC (Business Logic Component) is my go-to for production apps. The explicit event/state pattern makes code predictable and highly testable.

\`\`\`dart
// Events
abstract class CounterEvent {}
class IncrementPressed extends CounterEvent {}
class DecrementPressed extends CounterEvent {}

// States
abstract class CounterState {}
class CounterInitial extends CounterState { final int count = 0; }
class CounterUpdated extends CounterState {
  final int count;
  const CounterUpdated(this.count);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterInitial()) {
    on<IncrementPressed>((event, emit) {
      final current = state is CounterUpdated
          ? (state as CounterUpdated).count
          : 0;
      emit(CounterUpdated(current + 1));
    });
  }
}
\`\`\`

**Use BLoC when**: You're building a production app, need comprehensive testing, have complex async flows, or are working in a team where predictability matters.

## Riverpod — The Sweet Spot

Riverpod is Provider's spiritual successor. It fixes Provider's dependency injection issues and adds compile-time safety.

\`\`\`dart
// Define a provider
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);

  void increment() => state++;
  void decrement() => state--;
}

// Use in widget
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);

    return Column(children: [
      Text('\$count'),
      ElevatedButton(
        onPressed: () => ref.read(counterProvider.notifier).increment(),
        child: Text('Increment'),
      ),
    ]);
  }
}
\`\`\`

**Use Riverpod when**: You want Provider's simplicity but with better compile-time guarantees and easier testing.

## My Recommendation

For 2025, I use **BLoC** on team projects and anything that needs to be maintained long-term. The verbosity is a feature — it forces explicit state transitions and makes debugging straightforward.

For personal projects or quick MVPs, **Riverpod** is excellent. It's less boilerplate than BLoC without sacrificing testability.

**Avoid Provider** for anything beyond simple demos — you'll hit its limitations quickly.
    `.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    author: "Yudiya Ahrian",
    publishedAt: "2024-11-05",
    readingTime: 8,
    tags: ["Flutter", "Dart", "State Management", "BLoC", "Riverpod"],
    category: "opinion",
    featured: true,
    views: 4120,
  },
  {
    id: "4",
    slug: "realtime-with-socketio-nextjs",
    title: "Building Real-Time Features with Socket.io and Next.js",
    excerpt:
      "How I added real-time content broadcasting to Media Center using Socket.io, and the connection management patterns that made it production-reliable.",
    content: `
# Building Real-Time Features with Socket.io and Next.js

When building Media Center at PT Light Code Digital, we needed content updates to appear on remote screens instantly — no polling, no manual refresh. Here's how I set up Socket.io with Next.js.

## Server Setup

First, a standalone Node.js Socket.io server (not inside Next.js, to avoid serverless limitations):

\`\`\`javascript
// server/index.js
const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

// Track connected screens by channel
const channels = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Screen joins a channel
  socket.on('join-channel', (channelId) => {
    socket.join(channelId);
    if (!channels.has(channelId)) {
      channels.set(channelId, new Set());
    }
    channels.get(channelId).add(socket.id);
    console.log(\`Screen \${socket.id} joined channel \${channelId}\`);
  });

  // Admin broadcasts content to a channel
  socket.on('broadcast-content', ({ channelId, content }) => {
    socket.to(channelId).emit('content-update', content);
    console.log(\`Content broadcast to channel \${channelId}\`);
  });

  socket.on('disconnect', () => {
    channels.forEach((screens, channelId) => {
      screens.delete(socket.id);
    });
  });
});

httpServer.listen(3001, () => {
  console.log('Socket.io server running on port 3001');
});
\`\`\`

## Next.js Client Hook

A custom hook that manages the connection lifecycle:

\`\`\`typescript
// hooks/useSocket.ts
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  channelId?: string;
  onContentUpdate?: (content: Content) => void;
}

export function useSocket({ channelId, onContentUpdate }: UseSocketOptions) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      setError(null);

      if (channelId) {
        socket.emit('join-channel', channelId);
      }
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('connect_error', (err) => {
      setError(err.message);
      setConnected(false);
    });

    if (onContentUpdate) {
      socket.on('content-update', onContentUpdate);
    }

    return () => {
      socket.disconnect();
    };
  }, [channelId]);

  const broadcastContent = (content: Content) => {
    if (!channelId || !socketRef.current?.connected) return;
    socketRef.current.emit('broadcast-content', { channelId, content });
  };

  return { connected, error, broadcastContent };
}
\`\`\`

## Admin Dashboard Usage

\`\`\`typescript
// components/AdminDashboard.tsx
export function AdminDashboard({ channelId }: { channelId: string }) {
  const { connected, broadcastContent } = useSocket({ channelId });

  const handlePublish = (content: Content) => {
    broadcastContent(content);
  };

  return (
    <div>
      <StatusIndicator connected={connected} />
      <ContentEditor onPublish={handlePublish} />
    </div>
  );
}
\`\`\`

## Display Screen Usage

\`\`\`typescript
// components/DisplayScreen.tsx
export function DisplayScreen({ channelId }: { channelId: string }) {
  const [content, setContent] = useState<Content | null>(null);

  const { connected } = useSocket({
    channelId,
    onContentUpdate: (newContent) => {
      setContent(newContent);
    },
  });

  return (
    <div>
      {content ? <ContentRenderer content={content} /> : <IdleScreen />}
    </div>
  );
}
\`\`\`

## Key Lessons from Production

The most important thing I learned: **handle reconnection explicitly**. By default, Socket.io will try to reconnect, but you need to re-emit the join-channel event on reconnect or the screen won't receive updates after a disconnect.

Add this to your connect handler:

\`\`\`typescript
socket.on('connect', () => {
  // Re-join channel on every connect, including reconnects
  if (channelId) {
    socket.emit('join-channel', channelId);
  }
});
\`\`\`

This single line prevented 80% of the "screen not updating" bug reports after we deployed.
    `.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    author: "Yudiya Ahrian",
    publishedAt: "2025-05-14",
    readingTime: 10,
    tags: ["Next.js", "Socket.io", "TypeScript", "Real-Time", "WebSockets"],
    category: "tutorial",
    featured: false,
    views: 1560,
  },
  {
    id: "5",
    slug: "prisma-nextjs-database-patterns",
    title:
      "Prisma + Next.js: Database Patterns That Actually Work in Production",
    excerpt:
      "The Prisma setup, query patterns, and migration workflow I used when building Breadit — and what I'd do differently now.",
    content: `
# Prisma + Next.js: Database Patterns That Actually Work in Production

When I built Breadit, my Reddit-clone social media project, I used Prisma ORM with MySQL and Next.js API routes. Here's what I learned.

## Schema Design

Start with a clear schema before writing any code:

\`\`\`prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  name      String
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
  comments  Comment[]
  votes     Vote[]
  communities CommunityMember[]
}

model Post {
  id          String   @id @default(cuid())
  title       String
  content     String?  @db.LongText
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  community   Community @relation(fields: [communityId], references: [id])
  communityId String
  comments    Comment[]
  votes       Vote[]

  @@index([authorId])
  @@index([communityId])
}

model Comment {
  id        String   @id @default(cuid())
  text      String   @db.LongText
  createdAt DateTime @default(now())

  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  parentId  String?
  replies   Comment[] @relation("CommentReplies")

  @@index([authorId])
  @@index([postId])
}
\`\`\`

## Singleton Prisma Client

Always use a singleton in Next.js to avoid exhausting database connections during development:

\`\`\`typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
\`\`\`

## API Route Patterns

\`\`\`typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const communityId = searchParams.get('communityId');
  const cursor = searchParams.get('cursor');
  const limit = 10;

  const posts = await prisma.post.findMany({
    where: communityId ? { communityId } : undefined,
    include: {
      author: { select: { id: true, name: true, username: true, image: true } },
      community: { select: { id: true, name: true } },
      _count: { select: { comments: true, votes: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = posts.length > limit;
  const data = hasMore ? posts.slice(0, -1) : posts;
  const nextCursor = hasMore ? data[data.length - 1].id : null;

  return NextResponse.json({ posts: data, nextCursor });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: session.user.id,
      communityId: body.communityId,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
\`\`\`

## What I'd Do Differently

Looking back, I'd add database indexes more carefully upfront. The **@@index** declarations in the schema matter a lot once you have real data. My posts query was noticeably slow before I added indexes on the foreign keys.

Also — always use cursor-based pagination instead of offset-based. Offset pagination gets slower as your table grows. Cursor pagination stays fast regardless of dataset size.
    `.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=80",
    author: "Yudiya Ahrian",
    publishedAt: "2024-07-30",
    readingTime: 9,
    tags: ["Next.js", "Prisma", "MySQL", "TypeScript", "Database"],
    category: "tutorial",
    featured: false,
    views: 1890,
  },
  {
    id: "6",
    slug: "firebase-flutter-tips",
    title: "Firebase + Flutter: 5 Patterns I Use in Every Project",
    excerpt:
      "After integrating Firebase into multiple Flutter apps across internships and personal projects, these are the patterns I reach for every single time.",
    content: `
# Firebase + Flutter: 5 Patterns I Use in Every Project

Firebase and Flutter work together beautifully. But there are patterns that separate maintainable code from spaghetti. Here are the five I use consistently.

## 1. Abstract Firebase Behind a Repository

Never call Firebase directly from your widgets or BLoCs. Wrap it in a repository:

\`\`\`dart
// Abstract contract — domain layer knows nothing about Firebase
abstract class AuthRepository {
  Future<Either<Failure, UserEntity>> signIn(String email, String password);
  Future<Either<Failure, void>> signOut();
  Stream<UserEntity?> get authStateChanges;
}

// Firebase implementation
class FirebaseAuthRepository implements AuthRepository {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  Future<Either<Failure, UserEntity>> signIn(
    String email,
    String password,
  ) async {
    try {
      final credential = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return Right(UserEntity.fromFirebase(credential.user!));
    } on FirebaseAuthException catch (e) {
      return Left(AuthFailure(message: e.message ?? 'Auth failed'));
    }
  }

  @override
  Stream<UserEntity?> get authStateChanges {
    return _auth.authStateChanges().map(
      (user) => user != null ? UserEntity.fromFirebase(user) : null,
    );
  }
}
\`\`\`

## 2. Firestore Pagination with Streams

\`\`\`dart
class BookRepository {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  DocumentSnapshot? _lastDocument;
  static const int _pageSize = 10;

  Stream<List<Book>> getBooks({String? genre}) {
    Query query = _db.collection('books').orderBy('title').limit(_pageSize);

    if (genre != null) {
      query = query.where('genre', isEqualTo: genre);
    }

    if (_lastDocument != null) {
      query = query.startAfterDocument(_lastDocument!);
    }

    return query.snapshots().map((snapshot) {
      if (snapshot.docs.isNotEmpty) {
        _lastDocument = snapshot.docs.last;
      }
      return snapshot.docs
          .map((doc) => Book.fromFirestore(doc))
          .toList();
    });
  }
}
\`\`\`

## 3. Offline-First with Firestore Cache

Enable Firestore's offline persistence so your app works without internet:

\`\`\`dart
// In main.dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  // Enable offline persistence
  FirebaseFirestore.instance.settings = const Settings(
    persistenceEnabled: true,
    cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED,
  );

  runApp(MyApp());
}
\`\`\`

Now Firestore queries will return cached data instantly when offline, and sync when connectivity returns.

## 4. Typed Firestore Converters

Avoid raw \`Map<String, dynamic>\` everywhere:

\`\`\`dart
class Book {
  final String id;
  final String title;
  final String author;
  final String genre;

  const Book({
    required this.id,
    required this.title,
    required this.author,
    required this.genre,
  });

  static Book fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Book(
      id: doc.id,
      title: data['title'] as String,
      author: data['author'] as String,
      genre: data['genre'] as String,
    );
  }

  Map<String, dynamic> toFirestore() => {
    'title': title,
    'author': author,
    'genre': genre,
  };
}
\`\`\`

## 5. Firebase Storage with Progress

Always show upload progress for a good UX:

\`\`\`dart
Future<String> uploadFile(File file, String path) async {
  final ref = FirebaseStorage.instance.ref(path);
  final uploadTask = ref.putFile(file);

  uploadTask.snapshotEvents.listen((snapshot) {
    final progress = snapshot.bytesTransferred / snapshot.totalBytes;
    // Update your progress indicator
    progressNotifier.value = progress;
  });

  final snapshot = await uploadTask;
  return await snapshot.ref.getDownloadURL();
}
\`\`\`

These five patterns have saved me from subtle bugs and messy refactors across every Firebase project I've worked on. The most important one by far is #1 — abstracting Firebase behind a repository. It makes testing trivial and keeps your business logic Firebase-free.
    `.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200&q=80",
    author: "Yudiya Ahrian",
    publishedAt: "2024-04-18",
    readingTime: 8,
    tags: ["Flutter", "Firebase", "Dart", "Mobile", "Firestore"],
    category: "tips",
    featured: false,
    views: 2340,
  },
];

export const getFeaturedPosts = () => blogPosts.filter((p) => p.featured);
export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
export const getPostsByTag = (tag: string) =>
  blogPosts.filter((p) => p.tags.includes(tag));
export const getRelatedPosts = (post: BlogPost, limit = 3) =>
  blogPosts
    .filter(
      (p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t)),
    )
    .slice(0, limit);
