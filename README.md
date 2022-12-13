# examples.vue2

Repo holds a collection of vue 2 projects written with vite, to act as a transition to using modern Vue 2 build tools.

Below describes these projects

## vfg-repeatable-field

---

A work in progress for creating a repeatable field for use with vue-form-generator (vfg).

Since most of the forms on the website is built using vfg, I want to extend the functionality to include a repeatable field.

I love vfg for the fact that I can...

- use json/javascript to generate forms
- it does not force me to change the structure of my model variables, like it is with vue-formulate (vf). For eg. I can manipulate a single field in an object by specifying its model, using dot-syntax, like so:

```json
// code
{
    "label": "First name",
    "model": "lead.firstname"
}

// model
{
  "lead": {
    "firstname": "John",
    "lastname": "Denver"
  }
}
```

But, with vf, I am forced to first structure my markup like this:

```html
<FormulateInput type="group" name="lead">
  <FormulateInput type="text" name="firstname" label="First name:" />
</FormulateInput>
```

Then when I change first name, the model will be updated.

I am not able to to this... (I cannot use dot-syntax inside the name attribute)

```html
<FormulateInput type="text" name="lead.firstname" label="First name:" />
<FormulateInput type="text" name="lead.lastname" label="Last name:" />
```

With vf, I kind of forced to use markup, as opposed to json, because with vf json I cannot label the repeatable items like this...

```json
{
  "type": "group",
  "children": [
    {
      "type": "text",
      "name": "firstname"
    },
    {
      "type": "text",
      "name": "lastname"
    }
  ]
}

/*
What i mean is, you cannot label the repeated items like this with values from somewhere else 

Child 1 - alex jae sdafsagvsdf
    name: alex
    surname: jae sdafsagvsdf
    
Child 2 - john denver
    name: john
    surname: denver
*/
```

```json
// new_visadependent/new_relationship
[
  {
    "Key": "Brother in law",
    "Value": 100000000
  },
  {
    "Key": "Child",
    "Value": 100000001
  },
  {
    "Key": "Civil Partner",
    "Value": 100000002
  },
  {
    "Key": "Commonlaw Spouse",
    "Value": 100000003
  },
  {
    "Key": "Fiance",
    "Value": 100000004
  },
  {
    "Key": "Grandparent",
    "Value": 100000005
  },
  {
    "Key": "Parent",
    "Value": 100000006
  },
  {
    "Key": "Sibling",
    "Value": 100000007
  },
  {
    "Key": "Sister in law",
    "Value": 100000008
  },
  {
    "Key": "Spouse",
    "Value": 100000009
  },
  {
    "Key": "Partner",
    "Value": 100000010
  }
]
```
