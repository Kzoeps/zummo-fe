<script>
    import { SvelteUIProvider, Modal, Button, TextInput, Accordion, Checkbox} from '@svelteuidev/core';
</script>

<TextInput label="Customer Name"/> <br>
<TextInput label="Phone Number"/> <br>
<TextInput label="Bike Information"/> <br>
<Accordion multiple=true>
    <Accordion.Item value="wheelsystems">
        <div slot="control">Wheel Systems</div>
        <Checkbox  label="Hubs inspected for bent axles"  /> <br>
        <Checkbox  label="Hubs adjusted to not be tight or loose"  /> <br>
        <Checkbox  label="Rims trued and inspected"  /> <br>
        <Checkbox  label="Tires checked for wear, mounting, and inflation"  /> <br>
    </Accordion.Item>
    <Accordion.Item value="drivetrainsystem">
        <div slot="control">Drive Train System</div>
        <Checkbox  label="Bottom Bracket adjusted to not be tight or loose"  /> <br>
        <Checkbox  label="Crank arms securely mounted"  /> <br>
        <Checkbox  label="Wobbling chainwheels aligned"  /> <br>
        <Checkbox  label="Pedals securely mounted"  /> <br>
        <Checkbox  label="Chain inspected for wear and lubricated if necessary"  /> <br>
    </Accordion.Item>
    <Accordion.Item value="steeringsystem">
        <div slot="control">Steering System</div>
        <Checkbox  label="Headset inspected"  /> <br>
        <Checkbox  label="Fork and stem inspected"  /> <br>
        <Checkbox  label="Handlebars inspected, aligned, and tight"  /> <br>
    </Accordion.Item>
    <Accordion.Item value="brakesystem">
        <div slot="control">Brake System</div>
        <Checkbox  label="Brake calipers inspected"  /> <br>
        <Checkbox  label="Brake pads checked for wear"  /> <br>
        <Checkbox  label="Brake levers inspected"  /> <br>
        <Checkbox  label="Cable system tested by pulling brake lever firmly. Lubricate if needed."  /> <br>
        <Checkbox  label="Cable end finished with cap"  /> <br>
        <Checkbox  label="Rims cleaned"  /> <br>
    </Accordion.Item>
    <Accordion.Item value="shiftsystems">
        <div slot="control">Shift Systems</div>
        <Checkbox  label="Rear derailleur inspected for damage"  /> <br>
        <Checkbox  label="Rear derailleur lubricated"  /> <br>
        <Checkbox  label="Rear derailleur mounted securely"  /> <br>
        <Checkbox  label="Front derailleur inspected and lubricated"  /> <br>
        <Checkbox  label="Cables and housing lubricated"  /> <br>
        <Checkbox  label="Chain length checked for stretching"  /> <br>
        <Checkbox  label="Rear derailleur limit screws to allow shift to largest and smallest sprockets"  /> <br>
        <Checkbox  label="Rear derailleur checked for all gears"  /> <br>
        <Checkbox  label="Rear derailleur cable slack removed or indexing adjusted"  /> <br>
        <Checkbox  label="Front derailleur limit screws set"  /> <br>
        <Checkbox  label="Front derailleur checked for all gears"  /> <br>
    </Accordion.Item>
    <Accordion.Item value="miscellaneous">
        <div slot="control">Miscellaneous</div>
        <Checkbox  label="Frame checked for damage"  /> <br>
        <Checkbox  label="Seat post security checked"  /> <br>
        <Checkbox  label="Accessories checked for mounting security"  /> <br>
    </Accordion.Item>
    <Accordion.Item value="testride">
        <div slot="control">Test Ride</div>
        <Checkbox  label="Brakes checked for stopping and squeal"  /> <br>
        <Checkbox  label="Derailleurs checked for overshift"  /> <br>
        <Checkbox  label="Chain checked under load"  /> <br>
    </Accordion.Item>
</Accordion> <br>
<TextInput label="Notes"/> <br>
<TextInput label="Mechanic Completing Tune-Up"/> <br>
<TextInput label="Date"/> <br>
<Button ripple>Submit</Button> <br>