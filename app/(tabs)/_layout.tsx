import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export default function TabLayout() {
return (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen
      name="Home" // Corresponde a app/(tabs)/index.tsx (tu pantalla "Home")
      options={{
        title: 'Cursos',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nO3VQQqAMAxE0X88S29tb2K9hyJ0EQQhbirCf5BVFgOBISBNVIEd6ECZGdyBY8x227WwezPtq+A1E1xG+BW6pO8kJdjjyB7rn6r/OLDHEk9OW8N7ef+eTPQAAAAASUVORK5CYII=',
            }}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Notifications" // Corresponde a app/(tabs)/notifications.tsx
      options={{
        title: 'Notificaciones',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeklEQVR4nNWaS0hVQRzGf5rZi9RMepiFvaCgXRItjJ4UuOhJq4IoKqMnbVxVizAoaBkFFRGLoBApyCgKW1UUSYX2sKjoSVQWqZELLeNf343h4tVrnjn33A8GZJz5vu/MmZkz//9c8IcioBpoVakBppJmKAK+AF1xxerGkUaolvGLMm6lVnXnSCO0yrQ7+uNV9400wgeZtikW/yD2v8hjALAAeCXTtXoYK5dUZ/+bD2QSQWQBW4D33SzwROUtsFl9I4HJwAPH4EOgElgKnAE+AR+BKmAxsBe457S3vyem+iFmO9vsE6AMyEiy70KgUX2bgVmkCFM02mbkNDD0PzgGAyfFYVz2dkNf1HdloKqfC9fe4Cnx3Ql7E9gm4cca1f5iEPBInOWEBBuxlxK1rTYo2JoxzudhvZUlEmzwwN0g7kWEgMMS2+OBe5+4DxECbklsngfu+eK+QQh4J7FCD9xF4n5DCPghsSB2q3gMEbdpeEWWhDo8anRIw75V3jBcIhZv+EKbNIZ51GCUROwQ6AufpVHgUYMZErGvsC80SWO6R40/x3ATuepRo04a9qX3hnKJ2InVF05JY5NHDY5JZKdHjd3SOOJR419kN8ejxlxp1PsSGA380vaY7UuEv0f678BP7ZKBY5dG6jz+cUFaO4ImHqCY3MiX4R8rnG0+0NhkgxP0hJG+GegEb+uDIrWEQItI1xAe1kqzJYikRL6zU13uQ6onCGQAV5zcl3n5L0xQss2IXvg++yRAgbS7lAOz/HGf4/JmZ8Gl8k6jSNmYWCLPvCWF1U5MYNNpJKnHSGeadchjr3ijDvsjljHPlCfz9jqZDrEpNY3oYbq8WczSK06o8VOghOigBHgmb8eT6TDCyZLHYg+7xygmfBRL+5rjp1Eek47NDzofwlh5r8DnKFABrNNVgo3WTGCSyhiJ5TicOaob47Sbqb5l4qoQd103l0Yt8mTe3ow8YCNw1omlwyyfpW0ecgn4KF+q888BrSf7IcB13VrFbnPbga9Ap2OqU3XtTibmvvrWiKtS3KXSShluyqSdXhNhldpY28iiTSZtSiZCvtpY28iiVSZ7WpC5IST5+o3bMrm8hzYr1cay+pHFdueGt7tdJk8fWmuzlQgj24lfmrToc1RWOg9Rrygw0iiM+0FAfLGHGEuaIFs3v7YObHeyYtutTScvb+I3s5wzY2t+2hoAAAAASUVORK5CYII=',
            }}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile" // Corresponde a app/(tabs)/profile.tsx
      options={{
        title: 'Perfil',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3klEQVR4nO2a24vVVRTHP+OoM17IGZ0ms9LulJfpgn9CkQpTGr2UBUGUPdVMPfQQpBARZi/VUPRST5HUS2Z3JEaILK28PNSkU1FeKKx5CJpRx/HEgu+GxZk5v9/e+5wzSfiFwznwW9+192/vtdZea+0DF/D/RQdwJ/ACsBP4ATgJjOljv78H3pdML7CA8wRtwEbgE+AsUEn8GOdj4D7pmna0A08Ax92kTgGDwGZgA7ACWCTZdv1eCdwtmd3Aacc/BvRJdlqwFhh2E/gW2AR0ZujqFPc7p+8IcAdNhK3Uq25AG3xNg3S3aIEOOP2vNMPcLgG+0QCjwONAa6MHAWYC/QoONtZeoLtRyq/UdpviIWBVifx1wDPALuCEfOcfRbGXgGURY94EHNaYhzWHuncivMRXctgie38TmCiJVH8DDwAXlYzdBXztXqa7Hp8I5rQHmF8ge6lWPEz0Ddn8DcBcfSxiPe/C9Jh2yJ7Vwnz3MntzfeY1Z06LShx10EWwpSV6H9S5c0acL0om2OXMbCD1JdY5xy7zibske7LkhauxUmeHcZ8qkb3ZBYDo0DwH+EmkxyLk35KsHZCp6BX31wjZfucvUSb2pDsnYkLsX5K/hnS0aCeNvyQiNB+UrIX/Ugc/nrCF85yD5+Jz6bg9weSPle3K/RK0aBWDKyR/lHzslA4zs5gdDOnMvUWCn0no4chJdLsVykUYMzbdeVTyHxUdaGd1ElttEYNWHYBntFo5COdPT6T8QmXN47XqmfVSaDabgt/Eu4x0zNMinFa0jMXuInN8UQ8tT0rBe+LZeZKK28T9MpG3RTyrNCfhg8wJPSeefafiWXEtVUnBBvGsbJ6EkAbcmKBwhiuyniYdYWWHpSsWK1z6NAl/6mFKmrFEnBHyMSIdlnjGosulRZMQ6ufZCQpnKx+bSIh01ZFyQjpmJfDaXJ+gIS+CuiAV+djqBN5q55c1z4ScFwmmZXE6BbcAf4i7NYG3VZzfpSMFhaYVnN2KoVTcKq41D2IREsDUlzAsL3L23PCLIs5R8a0yLMNal77nZATrxbc8rWEHYkCf+D+XOH6HZCri5GBz0YGYm6IEzHL19ZRbLgy5GjwlUnkMFqUoOUljrbTeQmothC6LyeZgYVnS6FPqRzIHmSv+uQKZc5Ip6p4UYVNMyA6FlRUvOVjgWj21cEoyOVcKLa6wsg5+Yal7IrHQ8bhWXDuTaiGcVyabinWxpa5vPhxQwR+Ly9WNrCi1r4UdrulnnFjMBA7FNh+q20Ex4XGVGmejLvwWOfJSF35Hxe1pRjvIb+FYjUG6tSr7XE/XotH2yBTHZN6u6hPv12QX12hqJzfoqlumPyq3CR2/7Qp9YQIjWlWrEVJhnJddb6yiI+BdpT1o7CO5LdOpmtgDbgXHVZ3d06DLmDZdye1wizShi6U99TaxDRdrR7z5vANcT/OwDHi9ateHdcVRF652zv9LQtumHvS4gGAvcVWjFC/WlUFFt0/9Tbp6a1UzfNSZU907MZXPhAAQTv9G3r5aar/f6R9o9t37VNfTD2Ummh3iVl9Pr2GaMEcmENKijqGu9Ti6VVbqVNF1wz9Xq5nWyQbbq0qugXom84/DHi0K9H8tM6/cGz8r/7CUctMrEzeBnyoAmpEYXRcv4f0bJtkc+ueC+B8x78fHcKd4U6+1gAAAABJRU5ErkJggg==',
            }}
            style={{ width: size, height: size, tintColor: color }}
          />
        ),
      }}
    />
  </Tabs>
);
}