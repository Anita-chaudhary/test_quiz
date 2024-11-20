const SelectCategory = ({ categories, onSelectCategory }) => (
  <div className="select-category">
    <h2>Select a Quiz Category</h2>
    {categories.map((category) => (
      <div key={category.id} className="category-option">
        <div class="border-2 border-red-500">
          <input
            type="radio"
            id={category.id} // Use unique id for each radio button
            name="category" // Ensure that all radio buttons belong to the same group
            value={category.id} // Value will be used when selected
            onChange={() => onSelectCategory(category)} // Call onSelectCategory when selected
          />
        </div>
        <label htmlFor={category.id} className="category-label">
          {category.name}
        </label>
      </div>
    ))}
  </div>
);
export default SelectCategory;
