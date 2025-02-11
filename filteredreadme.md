To display all categories and implement a filter for them, follow these steps:

### Steps:
1. **Extract Categories**: Get unique categories from `propertyData`.
2. **Create a Filter State**: Store the selected category in state.
3. **Filter Property Data**: Display properties based on the selected category.
4. **Add Category Filter Buttons**: Allow users to select a category.

### Implementation:
Modify your `Home.js` file as follows:

#### 1️⃣ Add `categories` and `selectedCategory` states:
```javascript
const [selectedCategory, setSelectedCategory] = useState('All');

const categories = ['All', ...new Set(propertyData.map(item => item.category))];
```

#### 2️⃣ Implement Category Filter:
```javascript
const filteredProperties = selectedCategory === 'All' 
  ? propertyData 
  : propertyData.filter(item => item.category === selectedCategory);
```

#### 3️⃣ Add Category Buttons Above the Listings:
Inside the `return` statement, before the `<FlatList>` component:
```javascript
<View style={styles.categoryContainer}>
  <FlatList
    data={categories}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <TouchableOpacity 
        style={[styles.categoryButton, selectedCategory === item && styles.selectedCategory]} 
        onPress={() => setSelectedCategory(item)}
      >
        <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
          {item}
        </Text>
      </TouchableOpacity>
    )}
  />
</View>
```

#### 4️⃣ Modify `FlatList` to Use Filtered Data:
Replace `data={propertyData}` with:
```javascript
data={filteredProperties}
```

---

### Add Styles for Categories:
```javascript
categoryContainer: {
  flexDirection: 'row',
  marginBottom: 10,
},
categoryButton: {
  backgroundColor: '#ddd',
  paddingVertical: 15,
  paddingHorizontal: 8,
  borderRadius: 20,
  marginRight: 10,
},
selectedCategory: {
  backgroundColor: '#0056D2',
},
categoryText: {
  fontSize: 14,
  color: 'black',
},
selectedCategoryText: {
  color: 'white',
  fontWeight: 'bold',
},
```

---

Now, when a user taps on a category, only properties from that category will be shown. 🚀