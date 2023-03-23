import { Observable, tap, interval, shareReplay, take } from "rxjs";

const log = <T>(name: string, source: Observable<T>) =>
  source.pipe(
    tap({
      subscribe: () => console.log(`${name}: subscribed`),
      next: (value) => console.log(`${name}: ${value}`),
      complete: () => console.log(`${name}: completed`),
      finalize: () => console.log(`${name}: unsubscribed`),
    })
  );

const obs$ = log(
  "source",
  interval(1000).pipe(
    tap((i) => {
      console.log(`tap ${i}`);
    })
  )
);

const shared$ = log(
  "shared",
  obs$.pipe(shareReplay({ bufferSize: 1, refCount: true }), take(2))
);

shared$.subscribe((x) => console.log("sub A: ", x));
shared$.subscribe((y) => console.log("sub B: ", y));

setTimeout(() => {
  shared$.subscribe((z) => console.log("sub C: ", z));
}, 3000);

// PRINTS:
// shared: subscribed <-- reference count = 1
// source: subscribed
// shared: subscribed <-- reference count = 2
// source: 0
// shared: 0
// sub A: 0
// shared: 0
// sub B: 0
// source: 1
// shared: 1
// sub A: 1
// shared: completed <-- take(2) completes the subscription for sub A
// shared: unsubscribed <-- reference count = 1
// shared: 1
// sub B: 1
// shared: completed <-- take(2) completes the subscription for sub B
// shared: unsubscribed <-- reference count = 0
// source: unsubscribed <-- replaySubject unsubscribes from source observable because the reference count dropped to 0 and refCount is true

// In case of refCount being false, the unsubscribe is never called on the source and the source would keep on emitting, even if no subscribers
// are listening.
// source: 2
// source: 3
// source: 4
// ...
