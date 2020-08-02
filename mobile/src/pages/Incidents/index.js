import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Logoimg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);

    const response = await api.get('incidents', {
      params: { pages }
    });
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPages(pages + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logoimg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}> {total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentsList}
        // showsVerticalScrollIndicator={false}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incidents}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
            <TouchableOpacity style={styles.detailButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#e02141' />
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}