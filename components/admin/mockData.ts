import { User, UserRole } from '../../types';

const generateRandomDate = () => {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const firstNames = ['Aamir', 'Basit', 'Beenish', 'Dawood', 'Esha', 'Farhan', 'Ghazala', 'Hassan', 'Iqra', 'Javed', 'Kamran', 'Lubna', 'Mohsin', 'Nida', 'Osman', 'Parveen', 'Qasim', 'Rahat', 'Saba', 'Tariq'];
const lastNames = ['Khan', 'Ali', 'Pervaiz', 'Ibrahim', 'Saeed', 'Bibi', 'Raza', 'Aziz', 'Miandad', 'Akmal', 'Faryad', 'Abbas', 'Yasir', 'Khalid', 'Shakir', 'Shah', 'Fateh', 'Qamar', 'Aziz'];

export const mockUsers: User[] = Array.from({ length: 25 }, (_, i) => {
    const roleValues = [UserRole.Customer, UserRole.Restaurant, UserRole.Rider, UserRole.Shopkeeper];
    const role = roleValues[i % roleValues.length];
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;

    return {
        id: `user-${i + 1}`,
        name: name,
        email: email,
        role: role,
        avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
        status: i % 4 === 0 ? 'Inactive' : 'Active',
        joinedDate: generateRandomDate(),
        phone: `+923${Math.floor(100000000 + Math.random() * 900000000)}`,
        businessName: role === UserRole.Restaurant || role === UserRole.Shopkeeper ? `${firstName}'s ${role === UserRole.Restaurant ? 'Diner' : 'Mart'}` : undefined,
        vehicleType: role === UserRole.Rider ? (['motorbike', 'bicycle', 'car'] as const)[i % 3] : undefined,
    };
});