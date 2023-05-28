import React from 'react';
import {ScrollView, 
  TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {
  Button,
  AppBar,
  Flex,
  Box,
  Spacer,
  TextInput,
  Text,
  VStack,
} from '@react-native-material/core';
import {} from '@react-native-material/core';

const TextInputExample = () => {
  const [sheetData, setSheetData] = useState([]);

  function getAllSeries() {
    const SHEET_ID = '1yAPooC0AMXtEoU6B72y59roYZCTWz2ALRCWxz9cvCqU';
    const SHEET_NAME = 'Sheet1';
    const API_KEY = ;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`;

    axios
      .get(url)
      .then(function (response) {
        // handle success
        formatResponse(response.data);
      })
      .catch(function (error) {
        // handle error
        onError(error);
      })
      .finally(function () {
        // always executed
        console.log('ALL DONE LOADING DATA');
      });
  }

  function formatResponse(response: any) {
    const keys = response.values[0];
    const data = response.values.slice(1);
    const obj = data.map(arr =>
      Object.assign({}, ...keys.map((k, i) => ({[k]: arr[i]}))),
    );
    setSheetData(obj);
    console.log('obj', obj);
  }

  function onError(error: any) {
    console.error(error);
  }

  function handleSetClick(item) {
    console.log('Clicked on set:', item.sets);
  }

  useEffect(() => {
    getAllSeries();
  }, []);

  return (
    <>
      <AppBar title="OnlyFit" />
      <ScrollView>
        <Flex m={4} spacing={6} divider={true}>
          <VStack divider={true}>
            {sheetData.map((item, index) => {
              return (
                <Box
                  key={index}
                  borderWidth={1}
                  borderColor="black"
                  borderRadius={8}
                  padding={12}
                  flexDirection="row"
                  justifyContent="space-between">
                  <Text flex={1}>{item.exercise_name}</Text>
                  <TouchableOpacity onPress={() => handleSetClick(item)}>
                    <Text flex={1}>{item.sets + ' SETS'}</Text>
                  </TouchableOpacity>
                  <Text flex={1}>{item.reps + ' REPS'}</Text>
                  <TextInput
                    flex={1}
                    style={{width: 80, borderWidth: 1, borderRadius: 4}}
                    placeholder="Weight"
                  />
                </Box>
              );
            })}
          </VStack>
        </Flex>
      </ScrollView>
    </>
  );
};

export default TextInputExample;
