# STITCHERS POKEDEX STEP-BY-STEP

## OVERVIEW

This project aims to create a simple Pokedex using Angular. The objective is to provide a step-by-step guide on building an Angular application from scratch while interacting with the [PokéAPI](https://pokeapi.co/). The app will display details about different Pokémon, fetching data dynamically from the API.

By the end of this project, you will have a fully functional Pokedex application that uses Angular to interact with external APIs, manipulate data, and display it using components, services, and routing.

## 1 -> INSTALL DEPENDENCIES

First as always install all dependencies, for this you should run the command

```bash
 npm install

```

Then you should be able to start the project, run the command

```bash
 npm start

```

You now if you open the <http://localhost:4200/> you should be seen the follow page:
![Starting Point](image-1.png)

---

## 2 -> Routing

We will be creating two different routes in our project:

- ***Pokemon List***, in this route we will show the list of pokemon's.
- ***Items List***, in this route we will show the list of pokemon items.

Fist open the app-routing.module.ts file,

```typescript
const routes: Routes = [];
```

As you can see the current see the the routes is empty, we don't have any route yet define, lets define the two one above:

```typescript
  const routes: Routes = [  
    {
      path: '',
      component: HomePageComponent,
    },
    {
      path: 'pokemon',
      component: PokemonListComponent,
    },
    {
      path: 'items',
      component: ItemsListComponent,
    },
  ];
```

### Explanation

1. ````const routes: Routes````
  This declares a constant routes of type Routes, which is an array of route configurations. Each configuration object maps a URL path to a specific component that Angular should load

2. ````path````
  The path defines the part of the URL that corresponds to a specific route.
  In the first route, path: '' refers to the default path (the root URL), which will render the HomePageComponent.
  path: 'pokemon' matches when the URL contains /pokemon, and it will render the PokemonListComponent.
  Similarly, path: 'items' matches /items, and it will render the ItemsListComponent.

3. ````component````
The component specifies which Angular component should be displayed when the corresponding path is matched.
For example:
For path: '', the HomePageComponent will be displayed when the URL is the root (<http://localhost:4200>).
For path: 'pokemon', the PokemonListComponent will be displayed when the URL is /pokemon (<http://localhost:4200/pokemon>).
For path: 'items', the ItemsListComponent will be displayed when the URL is /items.

Now that the routes are define we need to be able to access this routes, so for that we need to add something to the app.component.html.
Bellow the closing tag of the element you wul see that there isn't any more elements. To be able to access the routes we will need to add a router-outlet.

Now that we have the router-outlet we need to access the routes them self, as you can see in the nav tag there are two elements with the copy *Pokemon* and *Items* with will be our way to navigate to the expected routes, please update this element by adding href="pokemon" and href="items" to each element.

Our HTML page should look like the follow.

```html
<div class="pokedex-container">
  <nav class="pokedex-nav">
    <ul>
      <li><a href="pokemon">Pokemon</a></li>
      <li><a href="items">Items</a></li>
    </ul>
  </nav>
  <div class="content">
    <header>
      <h1>Welcome to the Stitchers Pokédex!</h1>
    </header>
    <router-outlet></router-outlet>
  </div>
</div>
```

***Example Behavior***:
If you follow the guide these are the expected behaviors

- When URL is <http://localhost:4200/>:
The HomePageComponent will be shown.
- When URL is <http://localhost:4200/pokemon>:
The PokemonListComponent will be shown.
- When URL is <http://localhost:4200/items>:
The ItemsListComponent will be shown.

---

## 3 -> Pokemon Listing

Now lets look at the first route, Pokemon List, which the objective is to list the pokemon. So as you can see in the ```src/app/services/pokemon.service.spec.ts``` you can see a service that as already been created and as two function ready to user getPokemonList and getPokemonDetail.

We will use this service in this point to be able to list all the pokemon, but we need a place to store the pokemon list somewhere, so we will create a new service call PokemonListService.ts.

Inside the ```src/app/services``` run the command:

```bash
  ng g s pokemon-list
```

As you can see a new service appeared in that directory.
Sets now setup the service to be able to fetch and store the pokemon list.

First we need to have a variable so for that lets create a BehaviorSubject and an Observable.

```typescript
  /**
   * Pokemon List Subject and Observable
   */
  private pokemonListSubject: BehaviorSubject<Pokemon[]> =
    new BehaviorSubject<Pokemon[]>([]);
  pokemonListObservable = this.pokemonListSubject.asObservable();
```

### Explanation

#### **`BehaviorSubject`:**

- A `BehaviorSubject` is a type of RxJS `Subject` that holds an initial value and emits its current value to new subscribers immediately upon subscription.
- In this case, `pokemonListSubject` is initialized with an empty array (`[]`), representing an empty list of Pokémon. This ensures that subscribers will always get a value, even if no Pokémon have been loaded yet.
- This is particularly useful when working with asynchronous data, as it ensures that all components or services that subscribe to the `pokemonListSubject` get the latest list of Pokémon whenever they subscribe, even if it was previously emitted.

#### **Observable (`pokemonListObservable`):**

- `pokemonListObservable` is created by calling `.asObservable()` on `pokemonListSubject`.
- This step converts the `BehaviorSubject` into a read-only `Observable` that other parts of the application can subscribe to. By exposing the subject as an observable, you prevent direct modification of the subject's data from outside the service, ensuring better encapsulation and separation of concerns.
- Any component or service that needs to receive updates about the Pokémon list can subscribe to `pokemonListObservable`. Whenever the Pokémon list changes (e.g., when new Pokémon are fetched), all subscribers are notified and can act on the updated data.

#### **Why use this approach:**

- **Encapsulation**: Exposing only the observable (`pokemonListObservable`) hides the internal implementation (`pokemonListSubject`), preventing external components from directly manipulating the data.
- **Reactivity**: By using RxJS observables, the components subscribing to the `pokemonListObservable` automatically react to changes in the Pokémon list, enabling a reactive, event-driven architecture.

Now lets fetch the pokemon list, we already have the pokemon api service now we need to use it, in the constructor lets add the pokemon api service.~

```typescript
  constructor(private pokemonService: PokemonService) { }
```

In Angular, when we add a service to the constructor, we are using **Dependency Injection (DI)**, which is a core feature of the framework. Here's why this is important:

1. **Service Injection**:
   - By adding `private pokemonService: PokemonService` to the constructor, we are telling Angular to inject an instance of `PokemonService` into this component when it is created.
   - This ensures that the component can access the methods and properties defined in the service (such as `getPokemonList()` or `getPokemonDetail()`).

2. **Dependency Management**:
   - Angular's DI system manages the lifecycle of the service. When we inject a service into a component, Angular creates and provides the same instance of the service across the entire application, ensuring **singleton behavior** (unless scoped otherwise).
   - This allows different components or services to share data or logic easily, without needing to manually create new instances of the service every time.

3. **Testability**:
   - Injecting services into the constructor makes it easier to test the component in isolation. In unit tests, we can easily mock or replace the service with a test double, allowing us to test the component behavior without relying on the actual implementation of the service.

4. **Code Reusability**:
   - By placing the logic in a service and injecting it into components, we achieve separation of concerns. This allows the service's logic to be reused across multiple components or modules, keeping the codebase modular and maintainable.

Now lets fetch the list of pokemon,

```typescript
fetchPokemon() {
  this.pokemonService.getPokemonList().subscribe((data) => {
    const pokemonDetailRequests = data.results.map((result) =>
      this.pokemonService.getPokemonDetail(result.name)
    );

    // Use forkJoin to wait for all detail requests to complete
    forkJoin(pokemonDetailRequests).subscribe((pokemonList: Pokemon[]) => {
      // Emit the completed list of Pokémon
      this.pokemonListSubject.next(pokemonList);
    });
  });
}
```

### Explanation of `fetchPokemon()` Function

The `fetchPokemon()` function is responsible for fetching a list of Pokémon and then, for each Pokémon, fetching detailed information. It combines multiple asynchronous requests and emits the final list of Pokémon details to a `BehaviorSubject`.

#### Breakdown of the Function:

1. **Fetch the Pokémon List**:
   - The function calls `this.pokemonService.getPokemonList()`, which returns an observable containing a list of Pokémon names. The `.subscribe()` method is used to process the data once the list is returned asynchronously.
   - `data.results` contains an array of results, where each result represents a Pokémon with a name.

2. **Mapping Over Pokémon Results**:
   - The function then uses `.map()` to iterate over the `data.results` array. For each Pokémon, it creates an observable by calling `this.pokemonService.getPokemonDetail(result.name)`, which fetches the detailed information of the Pokémon using the name from the result.
   - The result is an array of observables called `pokemonDetailRequests`, where each observable is responsible for fetching the details of one Pokémon.

3. **Using `forkJoin()` to Combine All Requests**:
   - `forkJoin()` is used to combine multiple observables (`pokemonDetailRequests`). It waits for **all** the observables (Pokémon detail requests) to complete.
   - Once all the Pokémon details are fetched, `forkJoin()` emits a single array containing all the Pokémon details (`pokemonList`), which is an array of `Pokemon` objects.

4. **Emitting the Pokémon List**:
   - Once the details for all Pokémon are fetched and combined into the `pokemonList` array, the function emits the final list by calling `this.pokemonListSubject.next(pokemonList)`. 
   - This will trigger any subscribers of `pokemonListSubject` to receive the updated list of Pokémon.

#### Key Concepts

- **RxJS Observables**: The function relies on observables to handle asynchronous data flows.
- **`forkJoin()`**: This RxJS operator is critical for waiting until all asynchronous requests (in this case, Pokémon detail requests) have been completed before emitting the final array of Pokémon details.
- **`BehaviorSubject`**: The function uses `this.pokemonListSubject` to store and emit the latest list of Pokémon, ensuring that any component subscribing to this subject receives the updated data.

In summary, this function fetches a list of Pokémon, retrieves detailed information about each Pokémon in parallel using `forkJoin()`, and then emits the complete list of Pokémon details to any subscribers.

Now in the Pokemon List Component lets list our pokemon's.

### Step-by-Step Implementation for Fetching and Displaying Pokémon

#### 1. Adding the Service in the Constructor

**Code:**

```typescript
constructor(private pokemonListService: PokemonListService) { }
```

**What We Did:**

We injected the `PokemonListService` into the component using Angular's Dependency Injection (DI).

**Why We Did This:**

By injecting the service, we gain access to its methods, such as `fetchPokemon()`, and the observable that emits the Pokémon list. This allows the component to use the service’s functionality without needing to instantiate it manually, following Angular's best practices for managing dependencies.

**Concept:**

- **Dependency Injection (DI)**: DI is a design pattern used to inject services or objects into a class. It decouples components from their dependencies, making them easier to manage, test, and reuse.

---

#### 2. Fetching Pokémon and Subscribing to the Observable in `ngOnInit()`

**Code:**

```typescript
ngOnInit(): void {
  this.pokemonListService.fetchPokemon();

  const listSubscription = this.pokemonListService.pokemonListObservable.subscribe(list => {
    this.pokemonList = list;
  });

  this.subscriptionArray.push(listSubscription);
}
```

**What We Did:**

We called `fetchPokemon()` in the `ngOnInit()` lifecycle method to trigger the fetch operation when the component is initialized. Then, we subscribed to the `pokemonListObservable`, which emits the updated Pokémon list after it’s fetched. Inside the subscription, the fetched Pokémon list is assigned to the component’s `pokemonList` variable, which will be used for rendering in the template. We added the subscription (`listSubscription`) to the `subscriptionArray` to track all active subscriptions for later management.

**Why We Did This:**

Calling `fetchPokemon()` triggers the data retrieval process, while subscribing to the observable ensures that we get the latest Pokémon list once it is available. Storing the subscription in an array ensures we can properly manage (and later unsubscribe from) the subscription when the component is destroyed.

**Concepts:**

- **`ngOnInit()`**: This Angular lifecycle hook is called once the component is initialized. It is the appropriate place to make service calls and set up subscriptions.
- **RxJS Observable and `subscribe()`**: Observables handle asynchronous data streams in Angular. The `subscribe()` method allows the component to listen for data changes, such as when the Pokémon list is fetched.
- **`Subscription[]`**: We store active subscriptions in an array to track them and manage them later. This allows us to safely unsubscribe when the component is destroyed, preventing memory leaks.

---

#### 3. Cleaning Up Subscriptions in `ngOnDestroy()`

**Code:**

```typescript
ngOnDestroy(): void {
  this.subscriptionArray.forEach(subscription => {
    subscription.unsubscribe();
  });
}
```

**What We Did:**

In the `ngOnDestroy()` lifecycle hook, we iterated over the `subscriptionArray` and called `.unsubscribe()` on each subscription.

**Why We Did This:**

It is crucial to unsubscribe from observables in Angular to avoid memory leaks. Without unsubscribing, the observable would continue listening for updates even after the component is destroyed, leading to unnecessary memory usage and potential performance issues.

**Concepts:**

- **`ngOnDestroy()`**: This lifecycle hook is called just before the component is destroyed. It is the best place to clean up resources such as subscriptions.
- **Unsubscription**: Observables do not automatically stop emitting values when a component is destroyed. Manually unsubscribing ensures that the component does not continue to listen for data changes after it has been destroyed, improving memory efficiency.

---

### Summary of What We've Done:

- Injected the `PokemonListService` into the component using Dependency Injection to fetch the Pokémon list.
- Subscribed to the Pokémon list observable in the `ngOnInit()` method, ensuring that the component updates the list reactively when the data is fetched.
- Stored the subscription in an array (`subscriptionArray`) to manage it.
- In the `ngOnDestroy()` method, we unsubscribed from the observable to prevent memory leaks, ensuring that the application remains performant and does not continue to listen for updates after the component is destroyed.
