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
