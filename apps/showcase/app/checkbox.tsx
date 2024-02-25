import * as React from 'react';
import { View } from 'react-native';
import { Ui } from '@rnr/reusables';

const { Checkbox, Label, LabelText } = Ui;

export default function CheckboxScreen() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='flex-row gap-3 items-center'>
        <Checkbox aria-labelledby='terms' checked={checked} onCheckedChange={setChecked} />
        <Label onPress={() => setChecked((prev) => !prev)}>
          <LabelText nativeID='terms'>Accept terms and conditions</LabelText>
        </Label>
      </View>
    </View>
  );
}