# vf radio (and checkboxes) on support string values,

eg, this will not update the form control correctly

```js
var options = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];
```

but this will...

```js
var options = [
  {
    label: "Yes",
    value: "true",
  },
  {
    label: "No",
    value: "false",
  },
];
```

# v-if / v-show in vf

```js
    v-show="data.model.PrimaryApplicant[0].CriminalRecord"
```

Make sure the 'CriminalRecord' is initialized, even if its null

By the way... **v-if** is preferred...

```
https://vueformulate.com/guide/forms/#conditional-fields
```
