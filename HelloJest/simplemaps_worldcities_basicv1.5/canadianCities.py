canadianCities = []
with open('worldcities.csv', 'r') as file:
    for line in file:
        tokens = line.split(',')
        country = tokens[4]
        cityName = tokens[1]
        if (country == '"Canada"'):
            canadianCities.append(cityName.strip('\"'))
    file.close()
with open('canadianCities.txt', 'w') as file:
    for city in canadianCities:
        file.write(city + '\n')
    file.close()
