import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {myColors} from '../../styles/colors';
import blackrot from '../../assets/cauliflower/diseases/blackrot.jpg';
import dm from '../../assets/cauliflower/diseases/dm.jpg';
import als from '../../assets/cauliflower/diseases/als.jpg';
import nd from '../../assets/cauliflower/diseases/nd.jpg';
import insect from '../../assets/cauliflower/diseases/insect.jpg';

const {width} = Dimensions.get('window');
const cardWidth = width - 40;

const Insights = () => {
  const diseaseData = [
    {
      id: 1,
      title: 'Black Rot',
      image: blackrot,
      summary:
        'A bacterial disease causing yellow lesions and wilting. Prevent with disease-free seeds, crop rotation, and copper fungicides.',
      severity: 'High',
    },
    {
      id: 2,
      title: 'Downy Mildew',
      image: dm,
      summary:
        'Causes yellow patches and mold on leaves. Prevent by ensuring proper air circulation and using resistant varieties.',
      severity: 'Medium',
    },
    {
      id: 3,
      title: 'Alternaria Leaf Spot',
      image: als,
      summary:
        'Fungal spots causing premature leaf drop. Prevent by rotating crops and using copper fungicides.',
      severity: 'Medium',
    },
    {
      id: 4,
      title: 'Nutrient Deficiencies',
      image: nd,
      summary:
        'Cauliflower may show stunted growth due to nutrient imbalances. Prevent by applying balanced fertilizers.',
      severity: 'Low',
    },

    {
      id: 5,
      title: 'Insect Infestation',
      image: insect,
      summary:
        'Pests like aphids and worms damage plants. Prevent with organic insecticides and natural predators.',
      severity: 'High',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return '#FF6B6B';
      case 'Medium':
        return '#FFD166';
      case 'Low':
        return '#06D6A0';
      default:
        return myColors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={myColors.white} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Disease Prevention</Text>
        <View style={styles.headerDivider} />
        <Text style={styles.headerSubtitle}>Cauliflower</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {diseaseData.map(item => (
          <TouchableOpacity
            activeOpacity={100}
            key={item.id}
            style={styles.card}>
            <View style={styles.cardImageWrapper}>
              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View
                style={[
                  styles.severityBadge,
                  {backgroundColor: getSeverityColor(item.severity)},
                ]}>
                <Text style={styles.severityText}>{item.severity}</Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSummary}>{item.summary}</Text>
              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Prevention Tips</Text>
          <Text style={styles.infoBoxText}>
            • Maintain proper spacing between plants for adequate airflow{'\n'}•
            Practice crop rotation to prevent soil-borne diseases{'\n'}• Use
            disease-resistant varieties when available{'\n'}• Apply organic
            fungicides preventatively during wet seasons{'\n'}• Inspect plants
            weekly for early signs of disease
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: myColors.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: myColors.primary,
    textAlign: 'left',
  },
  headerDivider: {
    width: 45,
    height: 3,
    backgroundColor: myColors.primary,
    marginVertical: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: myColors.gray,
    marginBottom: 4,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  card: {
    width: cardWidth,
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: myColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  severityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '700',
    color: myColors.white,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: myColors.primary,
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 15,
    lineHeight: 22,
    color: myColors.gray,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: myColors.primary,
  },
  infoBox: {
    marginTop: 8,
    padding: 20,
    backgroundColor: myColors.white,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: myColors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  infoBoxTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: myColors.primary,
    marginBottom: 12,
  },
  infoBoxText: {
    fontSize: 14,
    lineHeight: 22,
    color: myColors.gray,
  },
});
