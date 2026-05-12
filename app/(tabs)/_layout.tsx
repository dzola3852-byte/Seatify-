
   import React, { useState } from 'react';
   import { View, StyleSheet, ScrollView } from 'react-native';
   import LanguageScreen from '@/components/seatify/LanguageScreen';
   import WelcomeScreen from '@/components/seatify/WelcomeScreen';
   import Dashboard  from '@/components/seatify/Dashbard';
   import type { Lang } from '@/constants/data';
   
   type Step = 'lang' | 'welcome' | 'dashboard';
   
   export default function Index() {
     const [step, setStep] = useState<Step>('lang');
     const [lang, setLang] = useState<Lang>('pt');
   
     return (
       <View style={styles.container}>
         {step === 'lang' && (
           <LanguageScreen onContinue={() => { setStep('welcome'); }} />
         )}
         {step === 'welcome' && (
           <WelcomeScreen lang={lang} onStart={() => setStep('dashboard')} />
         )}
        {step === "dashboard" && (
           <Dashboard lang={lang} onBack={() => setStep("welcome")} />
         )}
       </View>
     );
     
   }
   
   const styles = StyleSheet.create({
    container: {
       flex:1,
       
     },
   });
   