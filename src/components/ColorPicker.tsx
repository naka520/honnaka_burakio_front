import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface ColorPickerProps {
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
    const [color, setColor] = useState('#ffffff');
  
    const handleChangeComplete = (color: ColorResult) => {
      setColor(color.hex);
      onChange(color.hex);
    };
  
    return (
      <SketchPicker
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    );
  }
export default ColorPicker;