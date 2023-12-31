# Contacts Page

The contacts page has the following functionalities:
1. Search for a contact
1. Create a contact
1. Update a contact

*Note all of them have been coded in one page*

# Implementation details

### General Info

As noted in the main readme, `+page.server.js` contains all the interactions with airtable.
`+page.server.js` is basically the "backend" for `+page.svelte` which i will now refer to as the "frontend". The frontend has 3 forms as can be seen in the file. And as you can see each form has an `action` attribute. This is similar to `php` or any other server rendered pages where when the form is submitted or the submit button is clicked, the form will automatically call the route provided in the action with the data in the form.

So for example:
```
<form method="POST" action="?/updateRecord" use:enhance>
    <input name="id" type="hidden" value={data.records[0].id} />
    <ContactInfo {modalData} />
    <Flex gap="sm" mt={10} justify="right">
        <Button variant="outline" on:click={closeModal}>Cancel</Button>
        <Button type="submit" style="background-color: rgb(34,139,230)" on:click={() => console.log(data)}>Save</Button>
    </Flex>
</form>
```

In the code above, which is from the frontend for updating a form, the form has an action string called `?/updateRecord`. And if you look at `+page.server.js` you can see `updateRecord` on line `60`. The actions are explained more in detail on `+page.server.js` so please refer to that. 

Now since we wrote `action="?/updateRecord"` the form when submitted will hit the url of `http://wherever_it_is_currently_at/updateRecord` with the form data inside of ContactInfo component. The `use:enhance` attribute is to use javascript if available to make the form smoother.

*All methods should be POST since we want to be able to send form data which is not possible otherwise*

*The action url is starts with ?/ since typically a single html is only supposed to have one form and this is sveltes workaround so that multiple forms can be used in one page and each of the form can call their own actionUrl*

Since the page covers both the functionalities of creating and updating a contact. We have defined 2 modals for these. 

Note however that inside of both modals `<ContactInfo/>` component is used, this is because since create and update requires both the same fields we can extract this to the `<ContactInfo/>` component which can be found in `/src/lib/components/contact-info.svelte`

### Searching/Getting details for a specific contact

So how does the searching work? The searching for a specific contact works in this way. When you first load `/contacts` you will not have any search parameters. However once you type in a number and search for it, the form will call the method `searchRecord` in the `+page.server.js` on line 54. This function will just get the searched number and then redirect the user to this route `/contacts?number=(123) 123-1233`.

This is the same route but now we have a searchParam called `number`. The load function, on line `18` will be called. This function will check if there is number searchParam and if there is one it will call the Airtable API and get the info on that number and then return it to the frontend as data props. Look at `+page.server.js` for more info

### Updating and creating a contact

As mentioned above on submitting the forms the actions get called: `/updateRecord` in case of update, `/createRecord` in case of create. Both of these as can be seen return responses which are then passed to the frontend as the `form` variable. This will hold errors if there are any and is also how the frontend will know if there are any errors.

Please refer to the `+page.server.js` for additional documentation