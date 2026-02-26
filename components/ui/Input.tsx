import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  error?: string;
  isPassword?: boolean;
  variant?: 'underline' | 'box';
}

export const Input: React.FC<InputProps> = ({ 
  error, 
  isPassword, 
  style, 
  placeholder, 
  variant = 'underline',
  multiline,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isBox = variant === 'box';

  return (
    <View style={styles.container}>
      <View style={[
        isBox ? styles.boxContainer : styles.inputContainer,
        isFocused && (isBox ? styles.focusedBox : styles.focusedInput),
        error ? styles.errorInput : null,
        multiline && isBox && styles.multilineBox
      ]}>
        <TextInput
          style={[
            styles.input, 
            multiline && styles.multilineInput,
            style
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          selectionColor={Colors.primaryBlack}
          multiline={multiline}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
            {showPassword ? (
              <EyeOff size={20} color={Colors.textSecondary} />
            ) : (
              <Eye size={20} color={Colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: 'transparent',
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 20,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  focusedInput: {
    borderBottomColor: Colors.primaryBlack,
  },
  focusedBox: {
    borderColor: Colors.accentLime,
  },
  errorInput: {
    borderColor: Colors.error,
    borderBottomColor: Colors.error,
  },
  input: {
    flex: 1,
    fontFamily: 'Urbanist_400Regular',
    fontSize: 17,
    color: Colors.textPrimary,
    paddingVertical: 8,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  multilineBox: {
    alignItems: 'flex-start',
  },
  icon: {
    padding: 8,
  },
  errorText: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
});
